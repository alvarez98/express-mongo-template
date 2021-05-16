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
  console.log('Error: ', err.message)
  const { code, name = null, ...body } = err instanceof HttpError
    ? err
    : { code: 500, message: 'Internal server error' }
  res.status(code).send(body)
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
