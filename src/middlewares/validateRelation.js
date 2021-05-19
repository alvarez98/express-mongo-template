const HttpError = require('../classes/httpError')
const findOne = require('../db/controllers/findOne')
/**
 * @function validateRelation
 * @description Middleware for 404 errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateRelation = (
  model,
  reqProperty,
  attribute,
  key = attribute,
  errorMessage = ''
) => async (req, res, next) => {
  try {
    const isChildren = await findOne(model, {
      [key]: req[reqProperty][attribute],
      isActive: true
    })
    if (!isChildren) {
      throw new HttpError(400, errorMessage, {
        field: attribute,
        value: req[reqProperty][attribute]
      })
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = validateRelation
