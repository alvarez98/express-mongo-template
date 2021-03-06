const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const findOne = require('../db/controllers/findOne')
const paginate = require('../db/controllers/paginate')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const { buildNtfsFilters } = require('../db/controllers/buildFilters')

/**
 * @function addNotification
 * @description Controller for POST /api/notifications
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addNotification = async ({ body }, res, next) => {
  try {
    const client = await findOne(models.CONNECTION, {
      client: body.user,
      isConnected: true
    })
    if (client) { global.io.to(client.socket).emit('notification', JSON.stringify(body)) }
    body.data = JSON.stringify(body.data)
    const notification = await add(models.NOTIFICATION, body)
    res.status(201).json({ id: notification.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getNotifications
 * @description Controller for GET /api/notifications
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getNotifications = async ({ query }, res, next) => {
  try {
    let { limit = 20, orderBy = 'user', offset = 0, ...filters } = query
    filters = buildNtfsFilters(filters)
    const ntfcs = await paginate(
      models.NOTIFICATION,
      filters,
      limit,
      offset,
      orderBy
    )
    res.status(200).json({ results: ntfcs, count: ntfcs.length, offset })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneNotification
 * @description Controller for GET /api/notifications/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneNotification = async ({ params }, res, next) => {
  try {
    const notification = await findOne(models.NOTIFICATION, params)
    if (!notification) throw new HttpError(400, 'Notification not found')
    res.status(200).json({ data: notification, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateNotification
 * @description Controller for PUT /api/notifications/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateNotification = async ({ params, body }, res, next) => {
  try {
    if (body.data) body.data = JSON.stringify(body.data)
    const result = await updateOne(models.NOTIFICATION, params, body)
    res
      .status(200)
      .json({ id: params._id, message: 'Updated', changes: result.nModified })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteNotification
 * @description Controller for DELETE /api/notifications/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteNotification = async ({ params }, res, next) => {
  try {
    const resp = await updateOne(
      models.NOTIFICATION,
      { ...params, isActive: true },
      { isActive: false }
    )
    if (!resp.nModified) { throw new HttpError(400, `Notification ${params._id} not exist`) }
    res.status(200).json({ id: params._id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addNotification,
  getNotifications,
  getOneNotification,
  updateNotification,
  deleteNotification
}
