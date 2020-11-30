'use strict'
require('dotenv').config()
const mongoose = require('mongoose')

const {
  MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env

const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true
}
const credentials = `${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@`

const URI = `mongodb://${credentials}${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
module.exports = () => mongoose.connect(URI, options)
