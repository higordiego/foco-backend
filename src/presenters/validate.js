const Hoek = require('hoek')
module.exports = ({

  validateBody: (object, ...body) => returnObject => {
    object = Hoek.merge({}, object)
    body.map(key => {
      if (object[key] !== undefined) returnObject[key] = object[key]
      return returnObject
    })
  }
})
