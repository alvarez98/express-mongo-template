const Models = require('../models')

const findOne = (model, filters) => Models[model].findOne(filters).exec()

module.exports = findOne