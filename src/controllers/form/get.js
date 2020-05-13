
exports.method = 'GET'

exports.path = '/form'

exports.middlewares = []

exports.database = true

exports.handler = database => async (_, res, next) => {
  try {
    const { form } = database
    const { listAllPaginated } = require('../../presenters/persistence')(form)
    listAllPaginated(res, next)({ where: {} })
  } catch (err) {
    next(err)
  }
}
