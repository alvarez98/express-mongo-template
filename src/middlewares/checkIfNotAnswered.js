const HttpError = require('../classes/httpError')
const findOne = require('../db/controllers/findOne')
const models = require('../db/keys')
/**
 * @function checkIfNotAnswered
 * @description Middleware for check if not answered
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const checkIfNotAnswered = async (req, res, next) => {
  try {
    const isAnswered = await findOne(models.ANSWERED_SECTION, {
      studentId: req.body.studentId,
      sectionId: req.body.sectionId,
      questionaryId: req.body.questionaryId,
      isActive: true
    })
    if (isAnswered) {
      throw new HttpError(400, 'La sección ya ah sido respondida', {
        field: 'sectionId',
        value: req.body.sectionId
      })
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = checkIfNotAnswered
