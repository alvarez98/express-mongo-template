const HttpError = require('../classes/httpError')
// const add = require('../db/controllers/add')
const findOne = require('../db/controllers/findOne')
const find = require('../db/controllers/find')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const { buildAnswerFilters } = require('../db/controllers/buildFilters')
const add = require('../db/controllers/add')
const mongoose = require('mongoose')

/**
 * @function addAnswer
 * @description Controller for POST /api/answers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addAnswer = async ({ body }, res, next) => {
  try {
    const session = await mongoose.startSession()
    session.startTransaction()
    await add(
      models.ANSWERED_SECTION,
      {
        studentId: body.studentId,
        sectionId: body.sectionId,
        questionaryId: body.questionaryId,
      },
      { session }
    )
    await add(models.ANSWER, body.answers, { session })
    await session.commitTransaction()
    session.endSession()
    res.status(201).json({ message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getAnswers
 * @description Controller for GET /api/answers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getAnswers = async ({ query }, res, next) => {
  try {
    let { limit = 20, orderBy = 'user', offset = 0, ...filters } = query
    filters = buildAnswerFilters(filters)
    const answer = await find(models.ANSWER, filters, limit, offset, orderBy)
    res.status(200).json({ data: answer, count: answer.length, offset })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneAnswer
 * @description Controller for GET /api/answers/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneAnswer = async ({ params }, res, next) => {
  try {
    const answer = await findOne(models.ANSWER, params)
    if (!answer) throw new HttpError(400, 'Answer not found')
    res.status(200).json({ data: answer, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateAnswer
 * @description Controller for PUT /api/answers/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateAnswer = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.ANSWER, { _id: params.id }, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteAnswer
 * @description Controller for DELETE /api/answers/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteAnswer = async ({ params }, res, next) => {
  try {
    await updateOne(models.ANSWER, { _id: params.id }, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addAnswer,
  getAnswers,
  getOneAnswer,
  updateAnswer,
  deleteAnswer,
}
