const buildTagFilters = (filters) => {
  if (filters.id) filters.id = new RegExp(filters.id, 'i')
  if (filters.name) filters.name = new RegExp(filters.name, 'i')
  filters.isActive = true
  return filters
}

module.exports = buildTagFilters
