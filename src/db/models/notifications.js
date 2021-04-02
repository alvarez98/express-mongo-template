const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const models = require('../keys')

const notificationSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  user: { type: String, required: true },
  message: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  read: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { _id: false })

module.exports = mongoose.model(models.NOTIFICATION, notificationSchema)
