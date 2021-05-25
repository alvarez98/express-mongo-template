const { addConnSchm } = require('../../schemes/connections')

const validateConnection = (socket, next) => {
  const validation = addConnSchm.validate(socket.handshake.query)
  if (validation.error) {
    const err = new Error(validation.error.details[0].message)
    return next(err)
  }
  return next()
}

module.exports = validateConnection
