const { body, check, validationResult } = require('express-validator')

exports.objectValidateListOne = [
  check('id')
    .isNumeric()
    .not()
    .isEmpty()
]

exports.objectValidateCreate = [
  body('email')
    .isEmail(),

  body('documentation')
    .not()
    .isEmpty(),

  body('active')
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (typeof req.body.accept !== 'boolean') throw new Error('Por favor, envie se está ativo ou inativo!')
      else return true
    })
]

exports.objectValidateUpdate = [
  check('id')
    .isNumeric()
    .not()
    .isEmpty(),

  body('email')
    .optional()
    .isEmail(),

  body('documentation')
    .optional()
    .not()
    .isEmpty(),

  body('active')
    .optional()
    .not()
    .isEmpty()
]

exports.validation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  else next()
}
