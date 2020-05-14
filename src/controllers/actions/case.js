
const { check, body, validationResult } = require('express-validator')

const databaseFn = require('../../database/models')
const models = databaseFn

exports.objectValidateCreate = [
  body('name')
    .not()
    .isEmpty(),
  body('amount')
    .notEmpty()
    .isInt()
]

exports.objectValidateUpdate = [
  check('id')
    .isNumeric()
    .not()
    .isEmpty(),

  body('name')
    .optional()
    .notEmpty(),

  body('amount')
    .optional()
    .isInt()
]

exports.objectValidateListOne = [
  check('id')
    .isNumeric()
    .not()
    .isEmpty()
]

exports.objectValidateRemove = [
  check('id')
    .isNumeric()
    .not()
    .isEmpty()
]

exports.validation = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    const { action } = models
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const validate = await action.findOne({ where: { name: req.body.name }, raw: true })
    if (validate) return res.status(422).json({ errors: [{ param: 'name', location: 'body', msg: 'Nome já cadastrado!' }] })
    else next()
  } catch (error) {
    res.status(500).json(error.message)
  }
}

exports.validationUpdate = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  else next()
}
