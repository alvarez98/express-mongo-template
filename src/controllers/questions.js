const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const findOne = require('../db/controllers/findOne')
const paginate = require('../db/controllers/paginate')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const { buildQuestionFilters } = require('../db/controllers/buildFilters')

/**
 * @function addQuestion
 * @description Controller for POST /api/questions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addQuestion = async ({ body, params }, res, next) => {
  try {
    body.sectionId = params._id
    const question = await add(models.QUESTION, body)
    res.status(201).json({ id: question.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getQuestions
 * @description Controller for GET /api/questions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getQuestions = async ({ query }, res, next) => {
  try {
    let { limit = 20, orderBy = 'order', offset = 0, ...filters } = query
    filters = buildQuestionFilters(filters)
    const questions = await paginate(
      models.QUESTION,
      filters,
      limit,
      offset,
      orderBy
    )
    res
      .status(200)
      .json({
        result: questions.docs,
        total: questions.total,
        offset: questions.offset,
      })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getQuestionsBySection
 * @description Controller for GET /api/questionaries/:_id/sections
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getQuestionsBySection = async ({ params, query }, res, next) => {
  try {
    const { limit = 20, offset = 0 } = query
    const section = await findOne(models.SECTION, { _id: params._id })
    let questions = []
    for (const questionId of section.sectionQuestions) {
      const question = await findOne(models.QUESTION, { _id: questionId })
      questions.push(question)
    }
    questions = questions.slice(offset, offset + limit)
    res.status(200).json({
      result: questions,
      count: questions.length,
      offset,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneQuestion
 * @description Controller for GET /api/questions/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneQuestion = async ({ params }, res, next) => {
  try {
    const question = await findOne(models.QUESTION, {
      ...params,
      isActive: true,
    })
    if (!question) throw new HttpError(400, `Question ${params._id} not exist`)
    res.status(200).json({ result: question, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateQuestion
 * @description Controller for PUT /api/questions/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateQuestion = async ({ params, body }, res, next) => {
  try {
    const result = await updateOne(models.QUESTION, params, body)
    res
      .status(200)
      .json({ id: params._id, message: 'Updated', changes: result.nModified })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteQuestion
 * @description Controller for DELETE /api/questions/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteQuestion = async ({ params }, res, next) => {
  try {
    const resp = await updateOne(
      models.QUESTION,
      { ...params, isActive: true },
      { isActive: false }
    )
    if (!resp.nModified) {
      throw new HttpError(400, `Question ${params._id} not exist`)
    }
    res.status(200).json({ id: params._id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addQuestion,
  getQuestions,
  getQuestionsBySection,
  getOneQuestion,
  updateQuestion,
  deleteQuestion,
}
