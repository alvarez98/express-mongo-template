const HttpError = require('../classes/httpError')
const findOne = require('../db/controllers/findOne')
/**
 * @function checkItemExist
 * @description Middleware para validar la existencia de elementos
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */

const checkItemExist = (model, prop, attr) => async (req, res, next) => {
  try {
    const client = await findOne(model, { [attr]: req[prop][attr], isActive: true })
    if (!client) {
      throw new HttpError(400, `${model} "${req[prop][attr]}" not exist`)
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = checkItemExist
