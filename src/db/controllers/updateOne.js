const Models = require('../models')

const updateOne = (model, filter, data) => Models[model].updateOne(filter, data)

module.exports = updateOne
