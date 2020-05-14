const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const digit4 = () => Math.floor((1 + Math.random()) * 0x10000)

exports.token = (object) => {
  const key = process.env.TOKEN_SECRET
  const token = jwt.sign(object, key, { algorithm: 'HS256' })
  return token
}
exports.active = () => {
  return digit4() + digit4() * 2
}

exports.generatePassword = (password) => crypto.createHmac('sha256', process.env.TOKEN_SECRET).update(password).digest('hex')
