const Models = require('../models')

const paginate = (
  model,
  filters = {},
  limit,
  offset,
  sort = '_id',
  populate = ''
) =>
  Models[model].paginate(filters, {
    limit: parseInt(limit),
    offset: parseInt(offset),
    sort: { [sort]: 1 },
    populate,
  })

module.exports = paginate
