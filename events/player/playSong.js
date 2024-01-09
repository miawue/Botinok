const db = require("../../mongoDB");
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
  if (queue) {
    if (!client.config.opt.loopMessage && queue?.repeatMode !== 0) return;
    if (queue?.textChannel) {
      const embed = new EmbedBuilder()
      .setAuthor({
        name: 'Текущее воспроизведение трека',
        iconURL: 'https://cdn.discordapp.com/attachments/1140841446228897932/1144671132948103208/giphy.gif', 
    })
    .setDescription(`\n ‎ \n▶️ **Подробности :** **${song?.name}**\n▶️ **Получите максимальное удовольствие от прослушивания музыки. ** \n▶️ **Если ссылка обрывается при воспроизведении, попробуйте дать запрос.**`)
.setImage(queue.songs[0].thumbnail)
    .setColor('#FF0000')
    .setFooter({ text: 'Дополнительная информация - Используйте команду /help' });
     
      queue?.textChannel?.send({ embeds: [embed] }).catch(e => { });
    }
  }
}