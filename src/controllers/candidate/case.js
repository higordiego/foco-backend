const { body, validationResult } = require('express-validator')
const { cpf } = require('cpf-cnpj-validator')

const databaseFn = require('../../database/models')
const models = databaseFn

exports.objectValidate = [
  body('name')
    .not()
    .isEmpty(),
  body('birthday')
    .not()
    .isEmpty()
    .isISO8601(),
  body('cpf')
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (!cpf.isValid(req.body.cpf)) throw new Error('Cpf invalid!')
      return true
    }),
  body('email')
    .isEmail(),
  body('phone')
    .isString()
    .isLength({ min: 14, max: 20 }),
  body('accept')
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (typeof req.body.accept !== 'boolean' || req.body.accept !== true) throw new Error('Por favor, aceite o contrato para poder continuar!')
      else return true
    })

]

exports.validation = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    const { candidate } = models
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const validate = await candidate.findOne({ where: { email: req.body.email }, raw: true })
    if (validate) return res.status(422).json({ errors: [{ param: 'email', location: 'body', msg: 'Email já cadastrado!' }] })
    else next()
  } catch (error) {
    res.status(500).json(error.message)
  }
}
