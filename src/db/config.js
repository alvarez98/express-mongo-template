const mongoose = require('mongoose')
const { Configuration, Keys } = require('../config')

const USERNAME = Configuration.get(Keys.DB_USERNAME)
const PASSWORD = Configuration.get(Keys.DB_PASSWORD)
const HOST = Configuration.get(Keys.DB_HOST)
const PORT = Configuration.get(Keys.DB_PORT)
  ? `:${Configuration.get(Keys.DB_PORT)}`
  : ''
const DB_NAME = Configuration.get(Keys.DB_NAME)

const OPTIONS = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true,
  useCreateIndex: true,
  // useFindAndModify: false,
  // autoIndex: false, // Don't build indexes
  // poolSize: 10, // Maintain up to 10 socket connections
  // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4 // Use IPv4, skip trying IPv6
}

mongoose.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, converted) => {
    converted.id = converted._id
    delete converted._id
    delete converted.isActive
  },
})

const URI = `mongodb${
  Configuration.get(Keys.DB_PORT) ? '' : '+srv'
}://${USERNAME}:${PASSWORD}@${HOST}${PORT}/${DB_NAME}`

module.exports = () => mongoose.connect(URI, OPTIONS)
