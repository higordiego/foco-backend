
exports.method = 'POST'

exports.path = '/candidate'

exports.middlewares = []

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { candidate } = database
    const { create } = require('../../presenters/persistence')(candidate)
    create(res, next)(req.body)
  } catch (err) {
    next(err)
  }
}
