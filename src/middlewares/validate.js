const HttpError = require('../classes/httpError')
/**
 * @function validate
 * @description Middleware for 404 errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validate = (scheme, attr) => (req, res, next) => {
  try {
    const validation = scheme.validate(req[attr])
    if (validation.error)
      throw new HttpError(400, validation.error.details[0].message)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = validate
