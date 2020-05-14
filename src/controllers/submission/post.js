const { objectValidateCreate, validation } = require('./case')
const { validateBody } = require('../../presenters/validate')
exports.method = 'POST'

exports.path = '/submission'

exports.middlewares = [objectValidateCreate, validation]

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { submission } = database
    const body = {}
    validateBody(req.body, 'email', 'documentation', 'active')(body)
    const { create } = require('../../presenters/persistence')(submission)
    create(res, next)(body)
  } catch (err) {
    next(err.message)
  }
}
