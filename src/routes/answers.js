const express = require('express')
const router = express.Router()

const {
  getOneAnswer,
  deleteAnswer
} = require('../controllers/answers')
const {
  getOneAnswerSchm,
} = require('../schemes/answers')
const validate = require('../middlewares/validate')

router.get('/:_id', validate(getOneAnswerSchm, 'params'), getOneAnswer)
router.delete('/:_id', validate(getOneAnswerSchm, 'params'), deleteAnswer)

module.exports = router
