const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const tagSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { _id: false })

module.exports = mongoose.model('Tag', tagSchema)
