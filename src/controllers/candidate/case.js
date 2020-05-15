const { Op } = require('sequelize')
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

  body('actions')
    .notEmpty()
    .isArray()
    .custom((_, { req }) => {
      const actions = req.body.actions.map(val => Object.values(val)[0])

      const validateNumber = actions.find(val => typeof val !== 'number')

      if (validateNumber) throw new Error('Passe os ids do tipo numérico no campo action')
      return true
    })
    .custom((_, { req }) => {
      var valueArr = req.body.actions
      const isDuplicated = valueArr.some((val, i) => valueArr.indexOf(val) !== i)

      if (isDuplicated) throw new Error('Campos duplicados, por favor escolher só um de cada!')
      return true
    })
    .custom(async (_, { req }) => {
      const { action } = models

      const validateIds = await Promise.all(req.body.actions.map(async (val) => {
        const result = await action.findOne({ where: { id: val }, raw: true })
        if (!result) return true
        else return false
      }))

      if (validateIds.find(val => val)) throw new Error('Por favor passar um id em actions cadastrado no sistema!')
    })
    .custom(async (_, { req }) => {
      const { action } = models
      const validateAmount = await Promise.all(req.body.actions.map(async (acc, val) => {
        const result = await action.findOne({ where: { id: val, amount: { [Op.eq]: 0 } }, raw: true })
        if (result) return result
        else return null
      }))

      const validate = validateAmount.find(val => val)
      if (validate) throw new Error(`Ação de ${validate.name} já está preenchida, por favor escolha outra!`)
      return true
    }),

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

exports.createCandidateActions = (actions, candidate) => {
  const { candidate_action: candidateAction, action } = models
  return Promise.all(actions.map(async val => {
    await candidateAction.create({ ActionId: val, CandidateId: candidate.id })
    await action.decrement('amount', { by: 1, where: { id: val } })
  }))
}
