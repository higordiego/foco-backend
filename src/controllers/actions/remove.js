const { objectValidateRemove, validationUpdate } = require('./case')
exports.method = 'DELETE'

exports.path = '/action/:id'

exports.middlewares = [objectValidateRemove, validationUpdate]

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { action } = database
    const { remove } = require('../../presenters/persistence')(action)
    remove(res, next)({ where: req.params })
  } catch (err) {
    next(err)
  }
}
