const { objectValidateListOne, validationUpdate } = require('./case')
const { Op } = require('sequelize')
exports.method = 'GET'

exports.path = '/action/:id'

exports.middlewares = [objectValidateListOne, validationUpdate]

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { action } = database
    const { listOne } = require('../../presenters/persistence')(action)
    listOne(res, next)({ where: { id: req.params.id, amount: { [Op.gt]: 0 } } })
  } catch (err) {
    next(err)
  }
}
