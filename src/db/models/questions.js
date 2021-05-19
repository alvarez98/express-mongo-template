const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const models = require('../keys')

const questionSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  question: { type: String, required: true },
  questionType: { type: String, enum: ['MultipleOption', 'Checkbox', 'Text'], required: true },
  questionOptions: { type: [String], required: true },
  isActive: { type: Boolean, default: true }
}, { _id: false })

module.exports = mongoose.model(models.QUESTION, questionSchema)
