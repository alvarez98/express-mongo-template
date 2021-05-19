class HttpError extends Error {
  constructor (code = 500, message = 'Internal server error', details = null, ...params) {
    super(...params)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError)
    }
    this.name = 'HttpError'
    this.code = code
    this.message = message
    if (details) this.details = details
  }
}

module.exports = HttpError
