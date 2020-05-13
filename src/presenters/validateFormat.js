const error = require('./errors/returnErrors')

module.exports = {
    errorFormatter: (param) => error(param)
}
