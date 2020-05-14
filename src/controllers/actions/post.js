const { objectValidateCreate, validation } = require('./case')
const { validateBody } = require('../../presenters/validate')

exports.method = 'POST'

exports.path = '/action'

exports.middlewares = [objectValidateCreate, validation]

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { action } = database
    const body = {}

    validateBody(req.body, 'name', 'amount')(body)

    const { create } = require('../../presenters/persistence')(action)

    create(res, next)(body)
  } catch (err) {
    next(err.message)
  }
}
