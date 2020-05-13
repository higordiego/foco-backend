
exports.method = 'PUT'

exports.path = '/form/:id'

exports.middlewares = []

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { form } = database
    const { update } = require('../../presenters/persistence')(form)
    update(res, next)({ where: req.params })(req.body)
  } catch (err) {
    next(err)
  }
}
