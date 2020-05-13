require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const path = require('path')

const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const { Logger } = require('./src/presenters/logger-info')

const { RegisterError } = require('./src/presenters/errorLog')

const { requestHandler, errorHandler } = require('./src/presenters/sentry')

const { configCors } = require('./src/presenters/cors')

const app = express()

app.use(requestHandler())
app.use(errorHandler())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors(configCors))
app.use(morgan('combined'))
app.use(compression())
app.use(helmet())
app.disable('x-powered-by')

const port = process.env.EXPRESS_PORT || 3000
const server = http.createServer(app)

require('./src/presenters/geranteRoute')(app)

app.use((_, res) => res.status(404).json([{ title: '404', message: 'Route not found' }]))

app.get('/', (_, res) => res.sendFile(path.join(__dirname, './public', 'index.html')))

app.use(RegisterError)

server.listen(port, () => Logger.info(`Server start in port: http://localhost:${port}`))

module.exports = app
