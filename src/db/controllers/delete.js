const Models = require('../models')

const add = (model) => Models[model].deleteMany()

module.exports = add
