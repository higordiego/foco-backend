
exports.method = 'GET'

exports.path = '/candidate'

exports.middlewares = []

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { candidate } = database
    const { listAllPaginated } = require('../../presenters/persistence')(candidate)
    listAllPaginated(res, next)({ where: {} }, req.query.page || 1)
  } catch (err) {
    next(err)
  }
}
