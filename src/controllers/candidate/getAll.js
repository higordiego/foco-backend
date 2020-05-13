
exports.method = 'GET'

exports.path = '/candidate'

exports.middlewares = []

exports.database = true

exports.handler = database => async (_, res, next) => {
  try {
    const { candidate } = database
    const { listAllPaginated } = require('../../presenters/persistence')(candidate)
    listAllPaginated(res, next)({ where: {} })
  } catch (err) {
    next(err)
  }
}
