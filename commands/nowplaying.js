const { EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "nowplaying",
  description: "Получить информацию о текущей песне.",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {

      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Музыка не обнаружена!!`, ephemeral: true }).catch(e => { })

      const track = queue.songs[0];
      if (!track) return interaction.reply({ content: `⚠️ Музыка не обнаружена!!`, ephemeral: true }).catch(e => { })

      const embed = new EmbedBuilder();
      embed.setColor(client.config.embedColor);
      embed.setThumbnail(track.thumbnail);
      embed.setTitle(track.name)
      embed.setDescription(`> **Аудио** \`%${queue.volume}\`
> **Продолжительность :** \`${track.formattedDuration}\`
> **URL :** **${track.url}**
> **Повтор :** \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Очереди' : 'Текущей песни') : 'Отключен'}\`
> **Эквалайзер**: \`${queue.filters.names.join(', ') || 'Отключен'}\`
> **Трек включил :** <@${track.user.id}>`);


      interaction.reply({ embeds: [embed] }).catch(e => { })

    }  catch (e) {
    console.error(e); 
  }
  },
};
