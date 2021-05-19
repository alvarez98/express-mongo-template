'use strict'
const app = require('./app')
const connection = require('./db/config')
const { Configuration, Keys } = require('./config')
const validateConnection = require('./socket/middlewares/validateConnection')
const onConnection = require('./socket/events/onConnection')
const PORT = Configuration.get(Keys.PORT) || 5000

// Start server
const server = app.listen(PORT, () => {
  connection()
    .then(() => {
      console.log('Database is connected')
    })
    .catch((err) => {
      console.log(err)
      process.exit(0)
    })

  console.log(`API REST running on http://localhost:${PORT}`)
})

// Socket
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true
  }
})

io.use(validateConnection)
io.on('connection', onConnection)

global.io = io
