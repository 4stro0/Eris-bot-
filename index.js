const { default: chalk } = require('chalk');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { default: mongoose } = require('mongoose');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

const config = require('./config.json');
require('dotenv').config() // remove this line if you are using replit

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.prefix = config.prefix

module.exports = client;


['command', 'slashCommand', 'events' , 'eventMusic'].forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});


client.login('MTAzODczMzI1NDYxMTcxMDAyMg.GfM8Tk.wcZdrtKfXmdHMUlohj6H64M0DZW1EdRB386xfw')

