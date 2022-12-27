const client = require('..')
const chalk = require('chalk')

client.on("ready", () => {
	console.log(chalk.yellow(`
	Logged In ${client.user.tag}

	Prefix : ${client.prefix}
	`))
});
