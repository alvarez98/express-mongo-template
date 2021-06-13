const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const findOne = require('../db/controllers/findOne')
const find = require('../db/controllers/find')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')

/**
 * @function addSection
 * @description Controller for POST /api/sections
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addSection = async ({ body, params }, res, next) => {
  try {
    body.sectionId = params._id
    const section = await add(models.SECTION, body)
    res.status(201).json({ id: section.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getSections
 * @description Controller for GET /api/sections
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const getSections = async ({ query }, res, next) => {
  try {
    const { limit = 20, offset = 0 } = query
    const sections = await find(
      models.SECTION,
      {},
      limit,
      offset,
      'sectionName'
    )
    res.status(200).json({ data: sections, count: sections.length, offset })
  } catch (error) {
    next(error)
  }
}
/**
 * @function getSectionsByQuestionary
 * @description Controller for GET /api/questionaries/:_id/sections
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
*/

const getSectionsByQuestionary = async ({ params, query }, res, next) => {
  try {
    const { limit = 20, offset = 0 } = query
    const questionary = await findOne(models.QUESTIONARY, { _id: params._id })
    let sections = []
    for (const sectionId of questionary.questionarySections) {
      const section = await findOne(models.SECTION, { _id: sectionId })
      sections.push(section)
    }
    sections = sections.slice(offset, offset + limit)
    res.status(200).json({
      data: sections,
      count: sections.length,
      offset
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneSection
 * @description Controller for GET /api/sections/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
*/

const getOneSection = async ({ params }, res, next) => {
  try {
    const section = await findOne(models.SECTION, {
      ...params,
      isActive: true
    })
    if (!section) throw new HttpError(400, 'Section not exist')
    res.status(200).json({ data: section, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateSection
 * @description Controller for PUT /api/sections/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
*/

const updateSection = async ({ params, body }, res, next) => {
  try {
    const result = await updateOne(models.SECTION, params, body)
    res
      .status(200)
      .json({ id: params._id, message: 'Updated', changes: result.nModified })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteSection
 * @description Controller for DELETE /api/sections/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteSection = async ({ params }, res, next) => {
  try {
    const resp = await updateOne(
      models.SECTION,
      { ...params, isActive: true },
      { isActive: false }
    )
    if (!resp.nModified) {
      throw new HttpError(400, `Section ${params._id} not exist`)
    }
    res.status(200).json({ id: params._id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addSection,
  getSections,
  getSectionsByQuestionary,
  getOneSection,
  updateSection,
  deleteSection
}
