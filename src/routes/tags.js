const express = require('express')
const router = express.Router()

const {
  addTag,
  getTags,
  getOneTag,
  updateTag,
  deleteTag,
} = require('../controllers/tags')
const {
  addTagSchm,
  getOneTagSchm,
  getTagsSchm,
  updateTagSchm,
} = require('../schemes/tags')
const validate = require('../middlewares/validate')

router.post('/', validate(addTagSchm, 'body'), addTag)
router.get('/', validate(getTagsSchm, 'query'), getTags)
router.get('/:id', validate(getOneTagSchm, 'params'), getOneTag)
router.delete('/:id', validate(getOneTagSchm, 'params'), deleteTag)
router.put(
  '/:id',
  validate(getOneTagSchm, 'params'),
  validate(updateTagSchm, 'body'),
  updateTag
)

module.exports = router
