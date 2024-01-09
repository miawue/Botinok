const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');

module.exports = {
  name: "help",
  description: "Прочитать про бота и узнать про все команды",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const musicCommandsEmbed = new EmbedBuilder()
      .setColor(client.config.embedColor)
      .setTitle('🎸 **Музыкальные команды**')
        .addFields(
          { name: '🎹 Play', value: 'Потоковое воспроизведение песни по заданной ссылке или текста из источников' },
          { name: '⏹️ Stop', value: 'Заставляет бота прекратить воспроизведение музыки и ливнуть с голосового чата' },
          { name: '📊 Queue', value: 'Просмотр и управление очередью песен на этом сервере' },
          { name: '⏭️ Skip', value: 'Пропустить текущую воспроизводимую композицию' },
          { name: '⏸️ Pause', value: 'Приостановить воспроизведение текущей композиции' },
          { name: '▶️ Resume', value: 'Возобновление текущей приостановленной композиции' },
          { name: '🔁 Loop', value: 'Переключение режима цикла для очереди и текущей песни' },
          { name: '🔄 Autoplay', value: 'Включение или отключение автовоспроизведения [воспроизведение случайных композиций ].' },
          { name: '⏩ Seek', value: 'Переход к определенному времени в текущей композиции' },
          { name: '⏮️ Previous', value: 'Воспроизведение предыдущей песни в очереди' },
          { name: '🔀 Shuffle', value: 'Перемешать песни в очереди' }
        )
        .setImage(`https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=654f37ba&is=653cc2ba&hm=648a2e070fab36155f4171962e9c3bcef94857aca3987a181634837231500177&`); 

      const basicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTitle('✨ **Основные команды**')
        .addFields(
          { name: '🏓 Ping', value: "Проверьте задержку бота" },
          { name: '🗑️ Clear', value: 'Очистить очередь песен этого сервера' },
          { name: '⏱️ Time', value: 'Отображение текущего времени воспроизведения композиции' },
          { name: '🎧 Equalizer', value: 'Применяйте фильтры, чтобы улучшить звук так, как вам нравится.' },
           { name: '🎵 Now Playing', value: 'Отображение информации о текущей воспроизводимой композиции' },
          { name: '🔊 Volume', value: 'Отрегулируйте громкость музыки [ слушать на высокой громкости опасно ].' },
        ) 
       .setImage('https://cdn.discordapp.com/attachments/1150827819547504741/1168917372267151370/standard.gif?ex=65538222&is=65410d22&hm=b4994392f44679da41fc9304eb69deaa3769e136057556deec0db69ae8d33a97&')
      const button1 = new ButtonBuilder()
        .setLabel('YouTube')
        .setURL('https://youtu.be/dQw4w9WgXcQ?si=UcMGOTYksv_rILCH')
        .setStyle(ButtonStyle.Link);

      const button2 = new ButtonBuilder()
        .setLabel('Discord')
        .setURL('<@294244367655501824>')
        .setStyle(ButtonStyle.Link);

      const button3 = new ButtonBuilder()
        .setLabel('Code')
        .setURL('https://github.com/miawue/Botinok')
        .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder()
        .addComponents(button1, button2, button3);

      interaction.reply({
        embeds: [musicCommandsEmbed, basicCommandsEmbed],
        components: [row]
      }).catch(e => {});
    } catch (e) {
      console.error(e);
    }
  },
};