const express = require('express')
const router = express.Router()

const {
  addNotification,
  getNotifications,
  getOneNotification,
  updateNotification,
  deleteNotification,
} = require('../controllers/notifications')
const {
  addNtfSchm,
  getOneNtfSchm,
  getNtfsSchm,
  updateNtfSchm,
} = require('../schemes/notifications')
const validate = require('../middlewares/validate')
const checkItemExist = require('../middlewares/checkItemExist')
const models = require('../db/keys')

router.post('/', validate(addNtfSchm, 'body'), addNotification)
router.get('/', validate(getNtfsSchm, 'query'), getNotifications)
router.get('/:_id', validate(getOneNtfSchm, 'params'), getOneNotification)
router.delete(
  '/:_id',
  validate(getOneNtfSchm, 'params'),
  checkItemExist(models.NOTIFICATION, 'params', '_id'),
  deleteNotification
)
router.put(
  '/:_id',
  validate(getOneNtfSchm, 'params'),
  checkItemExist(models.NOTIFICATION, 'params', '_id'),
  validate(updateNtfSchm, 'body'),
  updateNotification
)

module.exports = router
