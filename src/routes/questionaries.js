const express = require('express')
const router = express.Router()

const {
  addQuestionary,
  getQuestionaries,
  getOneQuestionary,
  updateQuestionary,
  deleteQuestionary,
  getUnansweredSections
} = require('../controllers/questionaries')
const {
  addQuestionarySchm,
  getOneQuestionarySchm,
  getQuestionariesSchm,
  updateQuestionarySchm,
  getUnansweredSectionsSchm
} = require('../schemes/questionaries')
const { addAnswer } = require('../controllers/answers')
const { addAnswerSchm, addAnswerParamsSchm } = require('../schemes/answers')
const validate = require('../middlewares/validate')
const checkItemExist = require('../middlewares/checkItemExist')
const models = require('../db/keys')
const checkIfNotAnswered = require('../middlewares/checkIfNotAnswered')
const validateAnswers = require('../middlewares/validateAnswers')
const validateRelation = require('../middlewares/validateRelation')

router.post(
  '/',
  validate(addQuestionarySchm, 'body'),
  checkItemExist(models.SECTION, 'body', 'questionarySections', '_id'),
  addQuestionary
)
router.post(
  '/:questionaryId/section/:sectionId/answers',
  validate(addAnswerParamsSchm, 'params'),
  checkItemExist(models.QUESTIONARY, 'params', 'questionaryId', '_id'),
  checkItemExist(models.SECTION, 'params', 'sectionId', '_id'),
  validate(addAnswerSchm, 'body'),
  validateRelation(
    models.QUESTIONARY,
    'params',
    'sectionId',
    'questionarySections',
    'La sección no pertenece al cuestionario'
  ),
  checkIfNotAnswered,
  validateAnswers,
  addAnswer
)
router.get('/', validate(getQuestionariesSchm, 'query'), getQuestionaries)
router.get(
  '/:_id',
  validate(getOneQuestionarySchm, 'params'),
  getOneQuestionary
)
router.get(
  '/:questionaryId/sections/unanswered/student/:studentId',
  validate(getUnansweredSectionsSchm, 'params'),
  checkItemExist(models.QUESTIONARY, 'params', 'questionaryId', '_id'),
  getUnansweredSections
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
