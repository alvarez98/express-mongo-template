const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const models = require('../keys')

const connectionSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  client: { type: String, unique: true, required: true },
  socket: { type: String, required: true },
  data: { type: String, required: false },
  isConnected: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true }
}, { _id: false })

module.exports = mongoose.model(models.CONNECTION, connectionSchema)
