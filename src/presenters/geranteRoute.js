const fs = require('fs')
const path = require('path')

const { Logger } = require('./logger-info')

const parseObject = (list, dir) => list.reduce((acc, value) => {
  const obj = fs.readdirSync(`${dir}/${value}`)
  obj.map(a => acc.push({ object: a, root: `${value}`, dir: `${dir}/${value}/${a}` }))
  acc = acc.filter(a => a.object !== 'case.js')
  return acc
}, [])

const generateRoute = (list, app, database) => list.map(val => {
  const c = require(val.dir)
  let args = [`/api${c.path}`]
  args = args.concat(c.middlewares)
  c.database ? args.push(c.handler(database)) : args.push(c.handler)
  args.push(c.handler)
  app._router[c.method.toLowerCase()].apply(app._router, args)
})

module.exports = app => {
  try {
    const dir = path.join(__dirname, '../controllers')
    const databaseFn = require(path.join(__dirname, '../database/models'))
    const models = databaseFn
    const listRoutes = fs.readdirSync(dir)
    const parse = parseObject(listRoutes, dir)
    generateRoute(parse, app, models)
  } catch (err) {
    console.log(err)
    Logger.warn('Error in generate modules routes express.')
  }
}
