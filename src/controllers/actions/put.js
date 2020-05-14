const { objectValidateUpdate, validationUpdate } = require('./case')
const { validateBody } = require('../../presenters/validate')
exports.method = 'PUT'

exports.path = '/action/:id'

exports.middlewares = [objectValidateUpdate, validationUpdate]

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { action } = database
    const { update } = require('../../presenters/persistence')(action)
    const body = {}
    validateBody(req.body, 'name', 'amount')(body)
    update(res, next)({ where: req.params })(req.body)
  } catch (err) {
    next(err)
  }
}
