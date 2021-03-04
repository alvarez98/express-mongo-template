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

router.post('/', validate(addNtfSchm, 'body'), addNotification)
router.get('/', validate(getNtfsSchm, 'query'), getNotifications)
router.get('/:id', validate(getOneNtfSchm, 'params'), getOneNotification)
router.delete('/:id', validate(getOneNtfSchm, 'params'), deleteNotification)
router.put(
  '/:id',
  validate(getOneNtfSchm, 'params'),
  validate(updateNtfSchm, 'body'),
  updateNotification
)

module.exports = router
