const { EmbedBuilder } = require('discord.js')
const db = require("../mongoDB");

module.exports = {
  name: "ping",
  description: "Проверьте задержку бота",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {

      const start = Date.now();
      interaction.reply("Секундочку....").then(msg => {
        setTimeout(() => msg.delete(), 1000)
        const end = Date.now();
        const embed = new EmbedBuilder()
          .setColor(`#6190ff`)
          .setTitle('Задержка бота...')
        return interaction.editReply(`**Задержка** : ${((end - start) / 1000).toFixed(2)} с \n Красавчик - <@443398885440880652>`).catch(e => { });
      }).catch(err => { })

    } catch (e) {
    console.error(e); 
  }
  },
};