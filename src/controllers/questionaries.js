const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const findOne = require('../db/controllers/findOne')
const find = require('../db/controllers/find')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const { buildQuestionaryFilters } = require('../db/controllers/buildFilters')

/**
 * @function addQuestionary
 * @description Controller for POST /api/questionaries
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addQuestionary = async ({ body }, res, next) => {
  try {
    const questionary = await add(models.QUESTIONARY, body)
    res.status(201).json({ id: questionary.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getQuestionaries
 * @description Controller for GET /api/questionaries
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getQuestionaries = async ({ query }, res, next) => {
  try {
    let {
      limit = 20,
      orderBy = 'questionaryName',
      offset = 0,
      ...filters
    } = query
    filters = buildQuestionaryFilters(filters)
    const questionaries = await find(
      models.QUESTIONARY,
      filters,
      limit,
      offset,
      orderBy
    )
    res
      .status(200)
      .json({ data: questionaries, count: questionaries.length, offset })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneQuestionary
 * @description Controller for GET /api/questionaries/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneQuestionary = async ({ params }, res, next) => {
  try {
    const questionary = await findOne(models.QUESTIONARY, {
      ...params,
      isActive: true
    })
    if (!questionary) throw new HttpError(400, 'Questionary not exist')
    res.status(200).json({ data: questionary, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateQuestionary
 * @description Controller for PUT /api/questionaries/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateQuestionary = async ({ params, body }, res, next) => {
  try {
    const result = await updateOne(models.QUESTIONARY, params, body)
    res
      .status(200)
      .json({ id: params._id, message: 'Updated', changes: result.nModified })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteQuestionary
 * @description Controller for DELETE /api/questionaries/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteQuestionary = async ({ params }, res, next) => {
  try {
    const resp = await updateOne(
      models.QUESTIONARY,
      { ...params, isActive: true },
      { isActive: false }
    )
    if (!resp.nModified) { throw new HttpError(400, `Questionary ${params._id} not exist`) }
    res.status(200).json({ id: params._id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addQuestionary,
  getQuestionaries,
  getOneQuestionary,
  updateQuestionary,
  deleteQuestionary
}
