const db = require("../mongoDB");
module.exports = {
  name: "previous",
  description: "Воспроизводит предыдущий трек.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Музыка не обнаружена!!`, ephemeral: true }).catch(e => { })
      try {
        let song = await queue.previous()
        interaction.reply({ content: `**Вот чарующая мелодия прошлого.!!**` }).catch(e => { })
      } catch (e) {
        return interaction.reply({ content: `❌ Нет предыдущего трека!!`, ephemeral: true }).catch(e => { })
      }
    } catch (e) {
    console.error(e); 
  }
  },
};
