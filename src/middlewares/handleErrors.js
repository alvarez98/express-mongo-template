/**
 * @function handleErrors 
 * @description Middleware para manejo de errores de rutas
 * @param {Object} err - error en la peticion
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const handleErrors = (err, req, res, next) => {
    let code, error;
    (err.error && err.error.isJoi) ?
    (code = 400, error = err.error.toString()) : ({ code = 500, error = 'An internal server error ocurred' } = err)
    res.status(code).send({ error })
}

module.exports = { handleErrors }