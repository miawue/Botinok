const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "owner",
  description: "Get information about bot owner.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const youtubeLink = 'https://discord.gg/FUEHs7RCqz';
      const InstagramLink = 'https://www.instagram.com/rtxxgg/';
      const { EmbedBuilder } = require('discord.js')
        const embed = new EmbedBuilder()
            .setColor('#da2a41')
            .setImage('https://media.discordapp.net/attachments/846065371941568514/965307600134619156/pozitiv.gif?ex=65a41e42&is=6591a942&hm=fbebdb8b52bdc8e62efc43c784c9d30b65d51792a0dadc4d86c0286209dd4157&')
            .setAuthor({
          name: 'Связаться с разработчиком бота(кликабельно)',
          iconURL: 'https://media.discordapp.net/attachments/846065371941568514/965307600134619156/pozitiv.gif?ex=65a41e42&is=6591a942&hm=fbebdb8b52bdc8e62efc43c784c9d30b65d51792a0dadc4d86c0286209dd4157&',
          url: 'https://t.me/miawueq'
        })
            .setTimestamp();
      interaction.reply({ embeds: [embed] }).catch(e => {});

    } catch (e) {
    console.error(e); 
  }
  },
};
