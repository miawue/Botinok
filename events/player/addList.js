const db = require("../../mongoDB");
module.exports = async (client, queue, playlist) => {

queue?.textChannel?.send({ content: `<@${playlist.user.id}>, \`${playlist.name} (${playlist.songs.length + " " + '❌'})\` ❌❌` }).catch(e => { })
}