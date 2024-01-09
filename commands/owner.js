const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "owner",
  description: "Get information about bot owner.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const { EmbedBuilder } = require('discord.js')
        const embed = new EmbedBuilder()
            .setColor('#da2a41')
            .setImage('https://media.discordapp.net/attachments/211301957023956992/918818354536513567/image0-47-1-1.gif?ex=65aa5546&is=6597e046&hm=7de6d8cec188b27085763b98453a94552778ac22ae36212977462a441eb7a4e9&')
            .setAuthor({
          name: 'Связаться с разработчиком бота(кликабельно)',
          iconURL: 'https://media.discordapp.net/attachments/901478705497538590/1063142958251122880/ogo.gif?ex=65a95b89&is=6596e689&hm=c411ffc41479966726230e046777c9147fc8b092a442e216d5865b9ace009a04&',
          url: 'https://t.me/miawueq'
        })
            .setTimestamp();
      interaction.reply({ embeds: [embed] }).catch(e => {});

    } catch (e) {
    console.error(e); 
  }
  },
};
