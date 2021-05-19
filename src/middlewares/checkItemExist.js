const HttpError = require('../classes/httpError')
const findOne = require('../db/controllers/findOne')
/**
 * @function checkItemExist
 * @description Middleware para validar la existencia de elementos
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

const checkItemExist = (
  model,
  reqProperty,
  attribute,
  key = attribute
) => async (req, res, next) => {
  try {
    const valueToValidate = req[reqProperty][attribute]
    if (valueToValidate) {
      // Values array
      if (Array.isArray(valueToValidate)) {
        for (const item of valueToValidate) {
          const isExist = await findOne(model, {
            [key]: item,
            isActive: true
          })
          if (!isExist) {
            throw new HttpError(400, `${model} not exist`)
          }
        }
        // Unique value
      } else {
        const isExist = await findOne(model, {
          [key]: valueToValidate,
          isActive: true
        })
        if (!isExist) {
          throw new HttpError(400, `${model} not exist`)
        }
      }
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = checkItemExist
