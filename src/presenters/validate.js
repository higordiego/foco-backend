const Hoek = require('hoek')
module.exports = ({
  requestRequired: (req, required) => {
    required.map((key, index) => {
      req.assert(required[index], required[index]).notEmpty()
    })
    return req.validationErrors()
  },

  validateBody: (object, body) => returnObject => {
    object = Hoek.merge({}, object)
    body.map(key => {
      if (object[key] !== undefined) returnObject[key] = object[key]
      return returnObject
    })
  },

  requestOptional: (req, required) => {
    required.map((key, index) => {
      req.assert(required[index], required[index]).optional().notEmpty()
    })
    return req.validationErrors()
  },

  isAdmin: (req, res, next) => (parseInt(req.user.type) === 3) ? next() : res.status(401).json([{ title: 'Erro', message: 'Usuário não tem permissão para esse tipo ação!' }]),

  isNumber: (number, res, next, Error) => !isNaN(parseInt(number)) ? next() : res.status(400).json([Error]),

  isTerminate: (req, res, next) => req.user.validate_email ? next() : res.status(401).json([{ title: 'Error', message: 'Por favor, confirme o e-mail de cadastro!' }]),

  validateToken: (jwt, token) => jwt.decode(token, process.env.TOKEN_SECRET)
})
