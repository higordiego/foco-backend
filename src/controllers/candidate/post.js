const { objectValidate, validation } = require('./case')
const { validateBody } = require('../../presenters/validate')
exports.method = 'POST'

exports.path = '/candidate'

exports.middlewares = [objectValidate, validation]

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { candidate } = database
    const body = {}
    validateBody(req.body, 'name', 'cpf', 'birthday', 'email', 'phone', 'accept')(body)
    const { create } = require('../../presenters/persistence')(candidate)
    create(res, next)(body)
  } catch (err) {
    next(err.message)
  }
}
