const { EmbedBuilder, Collection, PermissionsBitField, codeBlock } = require('discord.js')
const ms = require('ms');
const client = require('..');
const config = require('../config.json');
const db = require('../handlers/database');

const prefix = client.prefix;
const cooldown = new Collection();



client.on('messageCreate', async message => {
	
	
	if(message.author.bot) return;
	if(message.channel.type !== 0) return;
	if(!message.content.startsWith(prefix)) return; 
	const args = message.content.slice(prefix.length).trim().split(/ +/g); 
	const cmd = args.shift().toLowerCase();
	if(cmd.length == 0 ) return;

	let command = client.commands.get(cmd)
	if(!command) command = client.commands.get(client.aliases.get(cmd));
	
	if(command) {
		if(command.cooldown) {
				if(cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send({ content: config.messages["COOLDOWN_MESSAGE"].replace('<duration>', ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), {long : true}) ) });
				if(command.userPerms || command.botPerms) {
					if(!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
						.setColor('Red')
						return message.reply({ embeds: [userPerms] })
					}
					if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
						.setColor('Red')
						return message.reply({ embeds: [botPerms] })
					}
				}

				command.run(client, message, args)
				cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
				setTimeout(() => {
					cooldown.delete(`${command.name}${message.author.id}`)
				}, command.cooldown);
			} else {
				if(command.userPerms || command.botPerms) {
					if(!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
						const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
						.setColor('Red')
						return message.reply({ embeds: [userPerms] })
					}
				
					if(!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
						const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
						.setColor('Red')
						return message.reply({ embeds: [botPerms] })
					}		
			} if (cmd.invc && !message.member.voice.channel) return message.reply('You Have To In Voice Channel')
			
				
				command.run(client, message, args)

				process.on('unhandledRejection' , async (err) => {
					message.reply({
						embeds: [
							new EmbedBuilder()
							.setTitle('Auto Detect And Report Bug')
							.setDescription(`
							I found errors and bugs that can be harmful or there are errors in this
							command, I will close access to this command until this command is fixed
	
							**-regards, automatic bug detection and reporting system**
	
							*..sending a message to the dev team*
	
						   ||(Error Type : unhandledRejection)||
							`)
							.setColor('Red')
							.setTimestamp()
						]
					})
					client.channels.cache.get('1056836052989513751').send({ embeds: [
						new EmbedBuilder()
						.setTitle('New Bug')
						.setDescription(`
					${codeBlock(err)}

					Command Name: \`${cmd}\`
					`)
					] })
				})
				process.on('uncaughtException' , async (err) => {
									message.reply({
					embeds: [
						new EmbedBuilder()
						.setTitle('Auto Detect And Report Bug')
						.setDescription(`
						I found errors and bugs that can be harmful or there are errors in this
					    command, I will close access to this command until this command is fixed


                       ||(Error Type : uncaughtException)||
						`)
						.setColor('Red')
						.setTimestamp()
					]
				})
				
				client.channels.cache.get('1056836052989513751').send({ embeds: [
					new EmbedBuilder()
					.setTitle('New Bug')
					.setDescription(`
					${codeBlock(err)}

					Command Name: \`${cmd}\`
					`)
				] })
				})
				process.on('uncaughtExceptionMonitor' , async (err) => {
									message.reply({
					embeds: [
						new EmbedBuilder()
						.setTitle('Auto Detect And Report Bug')
						.setDescription(`
						I found errors and bugs that can be harmful or there are errors in this
					    command, I will close access to this command until this command is fixed


                       ||(Error Type : uncaughtExceptionMonitor)||
						`)
						.setColor('Red')
						.setTimestamp()
					]
				})
				client.channels.cache.get('1056836052989513751').send({ embeds: [
					new EmbedBuilder()
					.setTitle('New Bug')
					.setDescription(`
					${codeBlock(err)}

					Command Name: \`${cmd}\`
					`)
				] })
				})
				
				


			
			module.exports = message
		}
	}
	
});