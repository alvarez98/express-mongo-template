const Models = require('../models')

const add = (model, data) => Models[model].create(data)

module.exports = add