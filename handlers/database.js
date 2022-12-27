const { default: chalk } = require("chalk");
const { Database } = require("quickmongo");


const db = new Database('mongodb+srv://naughtysd:230508Lahir@cluster0.b0gmn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')



db.on('ready' , () => {
    console.log(chalk.green('Connected To Database'))
})

module.exports = db