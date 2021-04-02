const HttpError = require('../classes/httpError')
/**
 * @function handleErrors
 * @description Middleware para manejo de errores de rutas
 * @param {Object} err - error en la peticion
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const handleErrors = (err, req, res, next) => {
  const { code, message: error } = err instanceof HttpError
    ? err
    : { code: 500, message: 'An internal server error ocurred' }
  res.status(code).send({ error })
}

/**
 * @function notFound
 * @description Middleware for 404 errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const notFound = (req, res, next) => {
  res.status(404).send({ error: 'Not found' })
}

module.exports = { handleErrors, notFound }
