const { Message, Client , Permissions , EmbedBuilder} = require('discord.js')
const ms = require('ms')
const db = require('quick.db')
const { listCommand } = require('../../handlers/function')
module.exports = {
name: 'help', 
description : 'Need Something?',
cooldown: 2000,
/**
*
* @param {Client} client
* @param {Message} message
* @param {String[]} args
*/
run: async (client, message, args) => {
    if (!args[0]) {

        listCommand(message)
    } else {

    const command =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.find(
        (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
      );

    if (!command) {
      const embed = new EmbedBuilder()
        .setTitle(`Invalid command! Use \`${client.prefix}help\` for all of my commands!`)
        .setColor("FF0000");
      return message.channel.send(embed);
    }

    const embed = new EmbedBuilder()
      .setTitle("Command Details:")
      .addFields(
        { name: 'Prefix' , value: `\`${client.prefix}\`` },
        { name: 'Command' , value: command.name ? `\`${command.name}\`` : 'No Name'  },
        { name: 'Aliases' , value: command.aliases ? `\`${command.aliases.join("` `")}\``: "No aliases for this command."  },
        { name: 'Usage' , value: command.usage ? `\`${client.prefix}${command.name} ${command.usage}\`` : `\`${client.prefix}${command.name}\``  },
        { name: 'Description' , value: command.description ? `\`${command.description}\`` : "No description for this command." },
        { name: 'Cooldown' , value: command.cooldown ? `\`${ms(command.cooldown)}\`` : 'No Cooldown , But dont fucking spam it'  }
    )
      .setTimestamp()
      .setColor('Grey');
    message.reply({ embeds: [embed] })
      }
    }
}