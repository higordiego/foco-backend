
exports.method = 'GET'

exports.path = '/form/:id'

exports.middlewares = []

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { form } = database
    const { listOne } = require('../../presenters/persistence')(form)
    listOne(res, next)({ where: req.params })
  } catch (err) {
    next(err)
  }
}
