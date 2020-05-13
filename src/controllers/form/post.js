
exports.method = 'POST'

exports.path = '/form'

exports.middlewares = []

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { form } = database
    const { create } = require('../../presenters/persistence')(form)
    create(res, next)(req.body)
  } catch (err) {
    next(err)
  }
}
