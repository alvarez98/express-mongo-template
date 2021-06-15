const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const models = require('../keys')
const mongoosePaginate = require('mongoose-paginate')

const tagSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { _id: false })

tagSchema.plugin(mongoosePaginate)

module.exports = mongoose.model(models.TAG, tagSchema)
