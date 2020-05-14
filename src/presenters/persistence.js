const returnObject = require('./returnObject')

module.exports = Model => ({
  create: (res, next, options = false) => async (data) => {
    try {
      const result = await Model.create(data)
      return options ? result : returnObject.sucessCreate(res)(result)
    } catch (err) {
      next(err)
    }
  },

  update: (res, next, options = false) => query => async mod => {
    try {
      const result = await Model.update(mod, query)
      return options ? result : returnObject.returnUpdate(res)(result)
    } catch (err) {
      next(err)
    }
  },

  listOne: (res, next, options = false) => async (query) => {
    try {
      const result = await Model.findOne(query)
      return options ? result : returnObject.findSuccess(res)(result)
    } catch (err) {
      next(err)
    }
  },

  listAll: (res, next, options = false) => async (query) => {
    try {
      const result = await Model.findAll(query)
      return options ? result : returnObject.findAllSuccess(res)(result)
    } catch (err) {
      next(err)
    }
  },

  remove: (res, next, options = false) => async (query) => {
    try {
      const destroy = await Model.destroy(query)
      return options ? destroy : returnObject.deleteSucess(res)(destroy)
    } catch (err) {
      next(err)
    }
  },

  listAllPaginated: (res, next, options = false) => async (query, pages) => {
    try {
      const HelperPaginate = require('./paginate')(Model)
      const page = await HelperPaginate.countAll(pages, query)
      const result = await HelperPaginate.listAll(query)(page)
      return options ? result : returnObject.findAllSuccess(res)(result)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
})
