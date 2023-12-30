const declOfNum = require("../utils/declOfNum");

const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")
const {
    YouTubeExtractor
 } = require('@discord-player/extractor');

const playFunc = async (player, interaction) => {
    player.extractors.register(YouTubeExtractor);
    const channel = interaction.member.voice.channel;
    if (!channel) return interaction.reply('Необходимо находится в голосовом канале'); // Убедимся что пользователь в голосовом канале
    const query = interaction.options.getString('url', true);

    await interaction.deferReply();

    try {
        const { track } = await player.play(channel, query, {
            nodeOptions: {
                // nodeOptions are the options for guild node (aka your queue in simple word)
                metadata: interaction // we can access this metadata object using queue.metadata later on
            }
        });

        return await interaction.followUp(`**${track.title}** воспроизводится!`);
    } catch (e) {
        // Если вдруг что-то пошло не так
        return await interaction.followUp(`Что-то пошло не так: ${e}`);
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Начинает проигрывание трека с YouTube")
		// .addSubcommand(subcommand =>
		// 	subcommand
		// 		.setName("search")
		// 		.setDescription("Searches for a song and plays it")
		// 		.addStringOption(option =>
		// 			option.setName("searchterms").setDescription("search keywords").setRequired(true)
		// 		)
		// )
        // .addSubcommand(subcommand =>
		// 	subcommand
		// 		.setName("playlist")
		// 		.setDescription("Начинает проигрывание плейлиста с YouTube")
		// 		.addStringOption(option => option.setName("url").setDescription("Ссылка на плейлист").setRequired(true))
		// )
		.addSubcommand(subcommand =>
			subcommand
				.setName("song")
				.setDescription("Начинает проигрывание одного трека с YouTube.")
				.addStringOption(option => option.setName("url").setDescription("Ссылка на трек").setRequired(true))
		),
	execute: async ({ client, interaction }) => {
        // Проверка на то что пользователь в войс канале
		if (!interaction.member.voice.channel) return interaction.reply("Для вызова команды необходимо находится в голосовом канале.");

        // Создает очередь проигрывания для сервера
		const queue = await client.player.nodes.create(interaction.guild);

        // Ждет пока пользователь подключится к голосовому чату
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new EmbedBuilder()

		if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            
            
            // Ищет трек с помощью DiscordPlayer
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })

            // Падает в ошибку если ничего не нашел
            if (result.tracks.length === 0)
                return interaction.reply("Ничего не было найдено")

            // Добавляет трек в очередь
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** был добавлена в очередь!`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Длительность: ${song.duration}`})

		}

        else if (interaction.options.getSubcommand() === "playlist") {

            // Ищем плейлист с помощью DiscordPlayer
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return interaction.reply(`По адресу ${url} не было найдено плейлиста`)
            
            // Добавляет треки в очередь
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} ${declOfNum(result.tracks.length, ['трек', 'трека', 'треков'])} [${playlist.title}](${playlist.url})** было добавлено в очередь`)
                .setThumbnail(playlist.thumbnail)

		} 
        else if (interaction.options.getSubcommand() === "search") {

            // Ищем трек с помощью DiscordPlayer
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            // Выкидываем ошибку если не было найдень
            if (result.tracks.length === 0)
                return interaction.editReply("Ничего не было найдено")
            
            // Добавляем трек в очередь
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** был добавлен в очередь`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Длительность: ${song.duration}`})
		}

        // Играем трек
        if (!queue.playing) {
            playFunc(client.player, interaction)

            // Отвечаем с информацией о проигрывателе
            await interaction.reply({
                embeds: [embed]
            })
        }
	},
}