const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const models = require('../keys')
const mongoosePaginate = require('mongoose-paginate')

const sectionSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  sectionName: { type: String, required: true },
  sectionDescription: { type: String },
  sectionQuestions: { type: [String], required: true },
  isActive: { type: Boolean, default: true }
}, { _id: false })

sectionSchema.plugin(mongoosePaginate)

module.exports = mongoose.model(models.SECTION, sectionSchema)
