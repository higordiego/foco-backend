const { objectValidateListOne, validation } = require('./case')
exports.method = 'GET'

exports.path = '/submission/:id'

exports.middlewares = [objectValidateListOne, validation]

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { submission } = database
    const { listOne } = require('../../presenters/persistence')(submission)
    listOne(res, next)({ where: req.params })
  } catch (err) {
    next(err)
  }
}
