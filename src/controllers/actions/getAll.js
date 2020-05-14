
exports.method = 'GET'

exports.path = '/action'

exports.middlewares = []

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { action } = database
    const { listAllPaginated } = require('../../presenters/persistence')(action)
    listAllPaginated(res, next)({ where: {} }, req.query.page || 1)
  } catch (err) {
    next(err)
  }
}
