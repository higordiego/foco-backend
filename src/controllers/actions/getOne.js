const { objectValidateListOne, validationUpdate } = require('./case')
exports.method = 'GET'

exports.path = '/action/:id'

exports.middlewares = [objectValidateListOne, validationUpdate]

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { action } = database
    const { listOne } = require('../../presenters/persistence')(action)
    listOne(res, next)({ where: req.params })
  } catch (err) {
    next(err)
  }
}
