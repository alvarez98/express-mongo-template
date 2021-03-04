'use strict'
const app = require('./app')
const connection = require('./db/config')
const { Configuration, Keys } = require('./config')
const PORT = Configuration.get(Keys.SERVER_PORT) || 5000

// Start server
const server = app.listen(PORT, () => {
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

// Socket
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log(socket.id);
  io.to(socket.id).emit('message', 'for your eyes only')
});