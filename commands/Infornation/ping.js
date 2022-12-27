const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Message, Client, EmbedBuilder } = require("discord.js");

const { cekJaringan, listCommand } = require("../../handlers/function");



module.exports = {
	name: 'ping',
	description: "Check bot's ping.",
	cooldown: 3000,
	userPerms: [],
	botPerms: [],
	/**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {string[]} args 
	 */
	run: async (client, message, args) => {
		cekJaringan(message)
		const helpButton = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
			.setCustomId('help-button')
			.setLabel('Need Help?')
			.setStyle(ButtonStyle.Primary)
		)
		message.channel.send({ components: [helpButton] })
		const filter = (interaction) => {
			if(interaction.user.id === message.author.id) return true;
			return interaction.reply({ content: 'This Is Not For You' , ephemeral: true })
		}
		const collector = message.channel.createMessageComponentCollector({
			max: 1
		})
		collector.on('collect' ,async (ButtonInteraction) => {
			const id = ButtonInteraction.customId;
			if(id === 'help-button') {
				listCommand(ButtonInteraction)
			}
		})
	}
};