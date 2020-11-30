'use strict'
const express = require('express')
const api = express.Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

api.use('/docs', swaggerUi.serve)
api.get('/docs', swaggerUi.setup(swaggerDocument))
api.get('/', (req, res) => {
  res.send({ message: 'Home' })
})

module.exports = api
