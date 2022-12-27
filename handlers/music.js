const { DisTube } = require("distube")
const client = require("..")

    const distube = new DisTube(client , {
        leaveOnStop: false,
        leaveOnFinish: false,
    })

    module.exports = distube
