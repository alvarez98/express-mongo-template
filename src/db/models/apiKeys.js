const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const apiKeySchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  origin: { type: String, required: true },
  key: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { _id: false })

module.exports = mongoose.model('ApiKey', apiKeySchema)