const express = require('express')
const router = express.Router()

const {
  addQuestionary,
  getQuestionaries,
  getOneQuestionary,
  updateQuestionary,
  deleteQuestionary
} = require('../controllers/questionaries')
const {
  addQuestionarySchm,
  getOneQuestionarySchm,
  getQuestionariesSchm,
  updateQuestionarySchm
} = require('../schemes/questionaries')
const validate = require('../middlewares/validate')
const checkItemExist = require('../middlewares/checkItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addQuestionarySchm, 'body'),
  checkItemExist(models.SECTION, 'body', 'questionarySections', '_id'),
  addQuestionary
)
router.get('/', validate(getQuestionariesSchm, 'query'), getQuestionaries)
router.get(
  '/:_id',
  validate(getOneQuestionarySchm, 'params'),
  getOneQuestionary
)
router.delete(
  '/:_id',
  validate(getOneQuestionarySchm, 'params'),
  deleteQuestionary
)
router.put(
  '/:_id',
  validate(getOneQuestionarySchm, 'params'),
  checkItemExist(models.QUESTIONARY, 'params', '_id'),
  validate(updateQuestionarySchm, 'body'),
  checkItemExist(models.SECTION, 'body', 'questionarySections', '_id'),
  updateQuestionary
)

module.exports = router
