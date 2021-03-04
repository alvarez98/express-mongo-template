const Models = require('../models')

const find = (model, filters, limit, offset, orderBy) =>
  Models[model]
    .find(filters)
    .limit(parseInt(limit))
    .skip(parseInt(offset))
    .sort(`${orderBy}`)
    .exec()

module.exports = find
