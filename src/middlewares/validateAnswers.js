const HttpError = require('../classes/httpError')
const findOne = require('../db/controllers/findOne')
const models = require('../db/keys')

/**
 * @function validateAnswers
 * @description Middleware for 404 errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateAnswers = async (req, res, next) => {
  try {
    const section = await findOne(models.SECTION, {
      _id: req.params.sectionId,
      isActive: true,
    })
    if (section.sectionQuestions.length !== req.body.answers.length)
      throw new HttpError(
        400,
        'La cantidad de respuestas no corresponden con el número de preguntas de la sección',
        {
          field: 'answers',
          value: req.body.answers,
        }
      )
    const formattedAnswers = []
    for (const sectionQuestion of section.sectionQuestions) {
      const question = await findOne(models.QUESTION, {
        _id: sectionQuestion,
        isActive: true,
      })
      const questionInSection = req.body.answers.find(
        (answer) => answer.questionId === sectionQuestion
      )
      if (!questionInSection) {
        throw new HttpError(400, `Se necesita respuesta para la pregunta: ${question.question}`, {
          field: 'answers',
          value: req.body.answers,
        })
      }
      if (
        (question.questionType === 'Text' &&
          typeof questionInSection.questionAnswer !== 'string') ||
        (question.questionType === 'MultipleOption' &&
          (typeof questionInSection.questionAnswer !== 'string' ||
            !question.questionOptions.includes(
              questionInSection.questionAnswer
            ))) ||
        (question.questionType === 'Checkbox' &&
          (!Array.isArray(questionInSection.questionAnswer) ||
            questionInSection.questionAnswer.some(
              (answer) => !question.questionOptions.includes(answer)
            )))
      )
        throw new HttpError(400, 'Respuesta inválida para la pregunta', {
          field: 'answers[].questionAnswer',
          value: questionInSection.questionAnswer,
        })

      formattedAnswers.push({
        questionId: questionInSection.questionId,
        answer: questionInSection.questionAnswer,
        studentId: req.body.studentId,
        sectionId: req.params.sectionId,
        questionaryId: req.params.questionaryId,
      })
    }
    req.body.answers = formattedAnswers
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = validateAnswers
