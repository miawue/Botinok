require('dotenv').config()

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require('discord-player');

const { readdirSync } = require('node:fs');
const { join } = require('node:path');
const { error } = require('node:console');
const { _ } = require('lodash');
const declOfNum = require('./utils/declOfNum');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
    ]
})

// Отлавливаем ошибки
client.on('error', error => {
    console.error('The WebSocket encountered an error:', error);
});

client.on('shardError', error => {
    console.error('The WebSocket encountered an error:', error);
});

client.on('shardDisconnect', error => {
    console.error('The WebSocket disconnected:', error);
});

// Загружает все команды

const commands = [];
client.commands = new Collection()

const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
    const filePath = join(commandsPath, file)
    const command = require(filePath)

    if (_.isEmpty(command)) continue;

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON())
}

client.player = new Player(client, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
})
client.player.extractors.loadDefault();

// Добавляем слэш-команды на сервер

client.on('ready', async () => {
    const guildIds = client.guilds.cache.map(guild => guild.id)
    const guildName = client.guilds.cache.map(guild => guild.name)


    const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

    for (const guildId of guildIds) {

        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {
            body: commands
        })
        .then((smth) => {
            console.log(`Было добавлено ${commands.length} ${declOfNum(commands.length, ['команда', 'команды', 'команд'])} для ${guildName}`)
        })
        .catch((error) => console.error(`Ошибка добавления команд для ${guildId} \n ${error}`))
    }

})

// Вызываем команды

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute({client, interaction})
    } catch (error) {
        console.log(command)
        console.error(`Ошибка вызова команды ${command.data.name} \n ${error}`)
        await interaction.reply('Произошла ошибка вызова команды. Напишите <@294244367655501824> что ему пора на завод а не заниматься этой хуйней')
    }

})

client.login(process.env.TOKEN)