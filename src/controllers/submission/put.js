const { objectValidateUpdate, validation } = require('./case')
const { validateBody } = require('../../presenters/validate')
exports.method = 'PUT'

exports.path = '/submission/:id'

exports.middlewares = [objectValidateUpdate, validation]

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { submission } = database
    const body = {}
    validateBody(req.body, 'email', 'documentation', 'active')(body)
    const { update } = require('../../presenters/persistence')(submission)
    update(res, next)({ where: req.params })(body)
  } catch (err) {
    next(err.message)
  }
}
