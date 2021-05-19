const operators = {
  equal: '$eq',
  less: '$lte',
  greater: '$gte'
}

const buildNtfsFilters = (filters) => {
  if (filters.user) filters.user = new RegExp(filters.user, 'i')
  if (filters.subject) filters.subject = new RegExp(filters.subject, 'i')
  if (filters.date) {
    filters.date = { [operators[filters.date[1]]]: filters.date[0] }
  }
  filters.isActive = true
  return filters
}

const buildTagFilters = (filters) => {
  if (filters.name) filters.name = new RegExp(filters.name, 'i')
  filters.isActive = true
  return filters
}

const buildQuestionaryFilters = (filters) => {
  if (filters.questionaryName) { filters.questionaryName = new RegExp(filters.questionaryName, 'i') }
  if (filters.questionaryAudicence) { filters.questionaryAudicence = new RegExp(filters.questionaryAudicence, 'i') }
  filters.isActive = true
  return filters
}

const buildSectionFilters = (filters) => {
  if (filters.sectionName) { filters.sectionName = new RegExp(filters.sectionName, 'i') }
  filters.isActive = true
  return filters
}

const buildQuestionFilters = (filters) => {
  if (filters.question) filters.question = new RegExp(filters.question, 'i')
  if (filters.questionType) filters.questionType = new RegExp(filters.questionType, 'i')
  filters.isActive = true
  return filters
}

const buildAnswerFilters = (filters) => {
  if (filters.question) filters.question = new RegExp(filters.question, 'i')
  if (filters.questionType) filters.questionType = new RegExp(filters.questionType, 'i')
  filters.isActive = true
  return filters
}

module.exports = {
  buildNtfsFilters,
  buildTagFilters,
  buildQuestionaryFilters,
  buildSectionFilters,
  buildQuestionFilters,
  buildAnswerFilters
}
