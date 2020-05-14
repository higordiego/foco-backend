const Mailgun = require('mailgun-js')

const returnPromise = (resolve, reject) => (err, body) => err ? reject(err) : resolve(body)

exports.sendEmail = (data) => new Promise((resolve, reject) => {
  const mailgun = new Mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })
  mailgun.messages().send(data, returnPromise(resolve, reject))
})
