const { addConnSchm } = require('../../schemes/connections')

const validateConnection = (socket, next) => {
  const validation = addConnSchm.validate(socket.handshake.query)
  if (validation.error) return next(validation.error.details[0].message)
  return next()
}

module.exports = validateConnection
