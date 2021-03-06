const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const models = require('../keys')
const mongoosePaginate = require('mongoose-paginate')

const questionarySchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  questionaryName: { type: String, required: true },
  questionaryDescription: { type: String },
  questionaryAudicence: { type: String },
  questionarySections: { type: [String], required: true },
  isActive: { type: Boolean, default: true }
}, { _id: false })

questionarySchema.plugin(mongoosePaginate)

module.exports = mongoose.model(models.QUESTIONARY, questionarySchema)
