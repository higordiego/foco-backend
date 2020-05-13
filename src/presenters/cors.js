
exports.configCors = ({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (process.env.origin_whitelist.indexOf(origin) === -1) return callback(null, false)
    else return callback(null, true)
  }
})
