const express = require('express')
const router = express.Router()

const {
  addSection,
  getSections,
  getOneSection,
  updateSection,
  deleteSection
} = require('../controllers/sections')
const {
  addSectionSchm,
  getOneSectionSchm,
  getSectionsSchm,
  updateSectionSchm
} = require('../schemes/sections')
const validate = require('../middlewares/validate')
const checkItemExist = require('../middlewares/checkItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addSectionSchm, 'body'),
  checkItemExist(models.QUESTION, 'body', 'sectionQuestions', '_id'),
  addSection
)
router.get('/', validate(getSectionsSchm, 'query'), getSections)
router.get('/:_id', validate(getOneSectionSchm, 'params'), getOneSection)
router.delete('/:_id', validate(getOneSectionSchm, 'params'), deleteSection)
router.put(
  '/:_id',
  validate(getOneSectionSchm, 'params'),
  checkItemExist(models.SECTION, 'params', '_id'),
  validate(updateSectionSchm, 'body'),
  checkItemExist(models.QUESTION, 'body', 'sectionQuestions', '_id'),
  updateSection
)

module.exports = router
