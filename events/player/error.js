module.exports = async (client, textChannel, e) => {
if (textChannel){
   return textChannel?.send(`**Возникла ошибка:** ${e.toString().slice(0, 1974)}`)
}
}