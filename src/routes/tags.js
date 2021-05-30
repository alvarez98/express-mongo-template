const express = require('express')
const router = express.Router()

const {
  addTag,
  getTags,
  getOneTag,
  updateTag,
  deleteTag
} = require('../controllers/tags')
const {
  addTagSchm,
  getOneTagSchm,
  getTagsSchm,
  updateTagSchm
} = require('../schemes/tags')
const validate = require('../middlewares/validate')
const checkItemExist = require('../middlewares/checkItemExist')
const models = require('../db/keys')

router.post('/', validate(addTagSchm, 'body'), addTag)
router.get('/', validate(getTagsSchm, 'query'), getTags)
router.get('/:_id', validate(getOneTagSchm, 'params'), getOneTag)
router.delete(
  '/:_id',
  validate(getOneTagSchm, 'params'),
  checkItemExist(models.TAG, 'params', '_id', 'No se encontró la etiqueta'),
  deleteTag
)
router.put(
  '/:_id',
  validate(getOneTagSchm, 'params'),
  checkItemExist(models.TAG, 'params', '_id', 'No se encontró la etiqueta'),
  validate(updateTagSchm, 'body'),
  updateTag
)

module.exports = router
