const Models = require('../models')

const updateOne = (model, id, data) => Models[model].updateOne({ id }, data)

module.exports = updateOne