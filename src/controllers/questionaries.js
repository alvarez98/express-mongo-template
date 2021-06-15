const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const findOne = require('../db/controllers/findOne')
const paginate = require('../db/controllers/paginate')
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
    const questionaries = await paginate(
      models.QUESTIONARY,
      filters,
      limit,
      offset,
      orderBy
    )
    res
      .status(200)
      .json({
        results: questionaries.docs,
        total: questionaries.total,
        offset: questionaries.offset,
      })
  } catch (error) {
    next(error)
  }
}
/**
 * @function getUnansweredSections
 * @description Controller for GET /api/questionaries
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getUnansweredSections = async ({ params }, res, next) => {
  try {
    const unansweredSections = []
    const questionary = await findOne(models.QUESTIONARY, {
      _id: params.questionaryId,
    })
    for (const sectionId of questionary.questionarySections) {
      const wasAnsweredSection = await findOne(models.ANSWERED_SECTION, {
        questionaryId: params.questionaryId,
        studentId: params.studentId,
        isActive: true,
        sectionId,
      })
      if (!wasAnsweredSection) {
        const section = await findOne(models.SECTION, { _id: sectionId })
        unansweredSections.push(section)
      }
    }
    res.status(200).json({ message: 'Success', results: unansweredSections })
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
      isActive: true,
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
    await updateOne(
      models.QUESTIONARY,
      { ...params, isActive: true },
      { isActive: false }
    )
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
  deleteQuestionary,
  getUnansweredSections,
}
