const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const models = require('../keys')
const mongoosePaginate = require('mongoose-paginate')

const answerSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  answerDate: { type: Date, default: Date.now },
  studentId: { type: String, required: true },
  sectionId: { type: String, required: true },
  questionaryId: { type: String, required: true },
  answer: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { _id: false })

answerSchema.plugin(mongoosePaginate)

module.exports = mongoose.model(models.ANSWER, answerSchema)
