const express = require('express')
const router = express.Router()

const {
  addQuestion,
  getQuestions,
  getOneQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/questions')
const {
  addQuestionSchm,
  getOneQuestionSchm,
  getQuestionsSchm,
  updateQuestionSchm
} = require('../schemes/questions')
const validate = require('../middlewares/validate')
const checkItemExist = require('../middlewares/checkItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addQuestionSchm, 'body'),
  addQuestion
)
router.get('/', validate(getQuestionsSchm, 'query'), getQuestions)
router.get('/:_id', validate(getOneQuestionSchm, 'params'), getOneQuestion)
router.delete(
  '/:_id',
  validate(getOneQuestionSchm, 'params'),
  deleteQuestion
)
router.put(
  '/:_id',
  validate(getOneQuestionSchm, 'params'),
  checkItemExist(models.QUESTION, 'params', '_id'),
  validate(updateQuestionSchm, 'body'),
  updateQuestion
)

module.exports = router
