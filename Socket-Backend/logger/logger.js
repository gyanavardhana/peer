const devLogger = require('./devlogger')
const prodLogger = require('./prodlogger')

let logger = devLogger();


module.exports = logger;