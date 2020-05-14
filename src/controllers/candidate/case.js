const { sendEmail } = require('../../presenters/mailgun')
const template = require('../../templates/candidate-html')
const { body, validationResult } = require('express-validator')
const { cpf } = require('cpf-cnpj-validator')

const databaseFn = require('../../database/models')
const models = databaseFn

const moment = require('moment')

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
      if (typeof req.body.accept !== 'boolean') throw new Error('Por favor, informe se quer ser contada por email!')
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

exports.sendEmailCandidate = (body, submission) => {
  let html = submissionRules(body, submission)
  html = template.templates({ html, ...body })
  sendEmail({ ...body, ...{ submission: process.env.MAILGUN_SUBMISSION_TEXT, from: submission.email } }, html)
}

const replace = (body, submission) => {
  let documentation = String(submission.documentation)
  body.dataEnvio = moment().format('DD/MM/YYYY')

  body.nome = body.name
  body.telefone = body.phone
  body.dataNascimento = moment(body.birthday).format('DD/MM/YYYY')

  var re = new RegExp(Object.keys(body).map(a => `@${a}`).join('|'), 'gi')
  documentation = documentation.replace(re, (matched) => body[matched.replace('@', '')])

  if (!body.accept) documentation = documentation.replace(body.email, '')

  return documentation
}

const submissionRules = (body, submission) => {
  if (submission) return replace(body, submission)
}
