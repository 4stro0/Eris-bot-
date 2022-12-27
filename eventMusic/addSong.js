const { Embed, EmbedBuilder } = require("discord.js");
const distube = require("../handlers/music");

distube.on('addSong' , (queue , song) => {
    queue.textChannel.send({ embeds: [
        new EmbedBuilder()
        .setTitle('Added Song')
        .setDescription(`
        [${song.name}](${song.url}) \`${song.duration}\`
        `)
        .setThumbnail(song.thumbnail)
    ] })
})