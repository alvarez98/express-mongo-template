const express = require('express')
const router = express.Router()

const {
  getAnswers,
  getOneAnswer,
  deleteAnswer
} = require('../controllers/answers')
const {
  getOneAnswerSchm,
  getAnswersSchm
} = require('../schemes/answers')
const validate = require('../middlewares/validate')

router.get('/', validate(getAnswersSchm, 'query'), getAnswers)
router.get('/:_id', validate(getOneAnswerSchm, 'params'), getOneAnswer)
router.delete('/:_id', validate(getOneAnswerSchm, 'params'), deleteAnswer)

module.exports = router
