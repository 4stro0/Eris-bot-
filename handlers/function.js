const { ButtonBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ActionRow, SelectMenuBuilder } = require("discord.js")
const { readdirSync } = require("fs")
const client = require("..")
const message = require("../events/messageCreate")

module.exports.cekJaringan = cekJaringan
module.exports.inviteMessage = inviteMessage
module.exports.inviteInteraction = inviteInteraction
module.exports.listCommand = listCommand

/**
 * 
 * @param {message} message 
 */

function cekJaringan(message) {
    message.reply({ content: `${client.ws.ping} Ms`  })
}
/**
 * 
 * @param {message} message 
*/

function inviteMessage(message) {
    
    const inviteEmbed = new EmbedBuilder()
    .setTitle('Invite Me!')
    .setDescription('Click Below Button To Invite Me')
    .setTimestamp()
    .setColor('Grey')
    
    const actionRow = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel('Invite Me')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=1038733254611710022&permissions=8&scope=bot%20applications.commands')
        )
        message.reply({ embeds: [inviteEmbed] , components: [actionRow] })
    }
    
    function inviteInteraction(interaction) {
        
    const inviteEmbed = new EmbedBuilder()
    .setTitle('Invite Me!')
    .setDescription('Click Below Button To Invite Me')
    .setTimestamp()
    .setColor('Grey')

    const actionRow = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel('Invite Me')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=1038733254611710022&permissions=8&scope=bot%20applications.commands')
        )
    interaction.reply({ embeds: [inviteEmbed] , components: [actionRow] })
}


async function listCommand (message , interaction) {
    const roleColor = 'Grey'
    
    
    let categories = [];
    
    readdirSync("./commands/").forEach((dir) => {
      const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );

      const cmds = commands.map((command) => {
        let file = require(`../commands/${dir}/${command}`);

        if (!file.name) return "No command name.";

        let name = file.name.replace(".js", "");

        return `\`${name}\``;
      });

      let data = new Object();

      data = {
        name: dir,
        value: cmds.length === 0 ? "In progress." : cmds.join(" "),
      };

      categories.push(data);
    });

    const embed = new EmbedBuilder()
      .setTitle("Pluto Help Command")
      .addFields(categories)
      .setDescription(
        `Use \`${client.prefix}help\` followed by a command name to get more additional information on a command. For example: \`${client.prefix}help ban\`.`
      )
      .setTimestamp()
      .setColor(roleColor);
      if(message){

          message.reply({ embeds: [embed] })  
      } else {
        interaction.reply({ embeds: [embed] , ephemeral: true })
      }
  }
