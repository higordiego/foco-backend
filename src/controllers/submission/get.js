
exports.method = 'GET'

exports.path = '/submission'

exports.middlewares = []

exports.database = true

exports.handler = database => async (_, res, next) => {
  try {
    const { submission } = database
    const { listAllPaginated } = require('../../presenters/persistence')(submission)
    listAllPaginated(res, next)({ where: {} })
  } catch (err) {
    next(err)
  }
}
