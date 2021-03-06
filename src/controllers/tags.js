const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const findOne = require('../db/controllers/findOne')
const find = require('../db/controllers/find')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const buildTagFilters = require('../db/controllers/filters/buildTagFilters')

/**
 * @function addTag
 * @description Controller for POST /api/tags
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addTag = async ({ body }, res, next) => {
  try {
    const tag = await add(models.TAG, body)
    res.status(201).json({ id: tag.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getTags
 * @description Controller for GET /api/tags
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getTags = async ({ query }, res, next) => {
  try {
    let { limit = 20, orderBy = 'name', offset = 0, ...filters } = query
    filters = buildTagFilters(filters)
    const tags = await find(
      models.TAG,
      filters,
      limit,
      offset,
      orderBy
    )
    res.status(200).json({ data: tags, count: tags.length, offset })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneTag
 * @description Controller for GET /api/tags/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneTag = async ({ params }, res, next) => {
  try {
    const tag = await findOne(models.TAG, params)
    if (!tag) throw new HttpError(404, 'Tag not found')
    res.status(200).json({ data: tag, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateTag
 * @description Controller for PUT /api/tags/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateTag = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.TAG, params.id, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteTag
 * @description Controller for DELETE /api/tags/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteTag = async ({ params }, res, next) => {
  try {
    await updateOne(models.TAG, params.id, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addTag,
  getTags,
  getOneTag,
  updateTag,
  deleteTag,
}
