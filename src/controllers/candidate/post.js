const { objectValidate, validation, sendEmailCandidate, createCandidateActions } = require('./case')
const { validateBody } = require('../../presenters/validate')

exports.method = 'POST'

exports.path = '/candidate'

exports.middlewares = [objectValidate, validation]

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { candidate, submission } = database
    const body = {}

    validateBody(req.body, 'name', 'cpf', 'birthday', 'email', 'phone', 'accept')(body)

    const { create } = require('../../presenters/persistence')(candidate)

    const textSubmission = await submission.findOne({ where: { active: true }, raw: true })
    sendEmailCandidate(body, textSubmission)
    const candidateCreate = await create(res, next, true)(body)
    createCandidateActions(req.body.actions, candidateCreate)
    res.status(200).json(candidateCreate)
  } catch (err) {
    next(err.message)
  }
}
