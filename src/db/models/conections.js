const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const connectionSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  client: { type: String, unique: true, required: true },
  socket: { type: Map, required: true },
  isActive: { type: Boolean, default: true },
})

module.exports = mongoose.model('Connection', connectionSchema)
