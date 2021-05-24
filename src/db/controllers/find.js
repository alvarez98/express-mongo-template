const Models = require('../models')

const find = (model, filters = {}, limit = 20, offset = 0, orderBy = '_id') =>
  Models[model]
    .find(filters)
    .limit(parseInt(limit))
    .skip(parseInt(offset))
    .sort(`${orderBy}`)
    .exec()

module.exports = find
