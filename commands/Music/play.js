const { Message, Client , Permissions } = require('discord.js')
const db = require('quick.db')
const distube = require('../../handlers/music')
module.exports = {
name: 'play', 
description : 'Play Music',
aliases: ['p'],
invc: true,
/**
*
* @param {Client} client
* @param {Message} message
* @param {String[]} args
*/
run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) return message.channel.send(`Please enter a song url or query to search.`)
    distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    })
    }
}