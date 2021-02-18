'use strict'
const app = require('./app')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const connection = require('./db/config')
const { Configuration, Keys } = require('./config')
const PORT = Configuration.get(Keys.SERVER_PORT) || 5000

// Socket
io.on('connection', (socket) => {
  socket.on('registry', (client) => {
    connections[client] = socket
  })
})


// Start server
app.listen(PORT, () => {
  connection()
    .then(() => {
      console.log('Database is connected')
    })
    .catch((err) => {
      console.error(err)
      process.exit(0)
    })

  console.log(`API REST running on http://localhost:${PORT}`)
})
