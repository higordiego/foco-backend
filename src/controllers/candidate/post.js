const { objectValidate, validation } = require('./case')
const { validateBody } = require('../../presenters/validate')
const { sendEmail } = require('../../presenters/mailgun')
exports.method = 'POST'

exports.path = '/candidate'

exports.middlewares = [objectValidate, validation]

exports.database = true

exports.handler = database => async (req, res, next) => {
  try {
    const { candidate } = database
    const body = {}
    validateBody(req.body, 'name', 'cpf', 'birthday', 'email', 'phone', 'accept')(body)
    const { create } = require('../../presenters/persistence')(candidate)
    const data = {
      from: 'noreply@finspect.me',
      to: req.body.email,
      subject: 'Hello from Mailgun',
      html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
    }
    sendEmail(data)
    create(res, next)(body)
  } catch (err) {
    next(err.message)
  }
}
