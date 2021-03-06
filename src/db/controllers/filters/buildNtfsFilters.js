const buildNtfsFilters = (filters) => {
  const comparisons = {
    equal: '$eq',
    less: '$lte',
    greater: '$gte',
  }
  if (filters.user) filters.user = new RegExp(filters.user, 'i')
  if (filters.subject) filters.subject = new RegExp(filters.subject, 'i')
  if (filters.date)
    filters.date = { [comparisons[filters.date[1]]]: filters.date[0] }
  filters.isActive = true
  return filters
}

module.exports = buildNtfsFilters
