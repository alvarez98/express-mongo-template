const express = require('express')
const router = express.Router()

const {
  addAnswer,
  getAnswers,
  getOneAnswer,
  deleteAnswer
} = require('../controllers/answers')
const {
  addAnswerSchm,
  getOneAnswerSchm,
  getAnswersSchm
} = require('../schemes/answers')
const validate = require('../middlewares/validate')
const checkItemExist = require('../middlewares/checkItemExist')
const models = require('../db/keys')
const validateAnswers = require('../middlewares/validateAnswers')
const validateRelation = require('../middlewares/validateRelation')
const checkIfNotAnswered = require('../middlewares/checkIfNotAnswered')

router.post(
  '/',
  validate(addAnswerSchm, 'body'),
  checkItemExist(models.QUESTIONARY, 'body', 'questionaryId', '_id'),
  checkItemExist(models.SECTION, 'body', 'sectionId', '_id'),
  validateRelation(
    models.QUESTIONARY,
    'body',
    'sectionId',
    'questionarySections',
    'La sección no pertenece al cuestionario'
  ),
  checkIfNotAnswered,
  validateAnswers,
  addAnswer
)
router.get('/', validate(getAnswersSchm, 'query'), getAnswers)
router.get('/:_id', validate(getOneAnswerSchm, 'params'), getOneAnswer)
router.delete('/:_id', validate(getOneAnswerSchm, 'params'), deleteAnswer)

module.exports = router
