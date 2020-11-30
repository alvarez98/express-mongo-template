const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

const api = require('./routes')
const { handleErrors, notFound } = require('./middlewares/errors')

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

// Routes
app.use('/api', api)
app.use(handleErrors)
app.use(notFound)

module.exports = app
