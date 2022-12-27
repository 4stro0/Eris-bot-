const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { inviteMessage } = require('../../handlers/function');

module.exports = {
	name: 'invite',
	description: "Get the bot's invite link",
	cooldown: 3000,
	userPerms: ['Administrator'],
	botPerms: ['Administrator'],
	run: async (client, message, args) => {
		inviteMessage(message)
	}
};
