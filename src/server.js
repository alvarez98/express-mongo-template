'use strict'
require('dotenv').config()
const connection = require('./db/config')
const app = require('./app')
const { PORT = 5000 } = process.env

// Start server
app.listen(PORT, () => {
  connection()
    .then(() => { console.log('Database is connected') })
    .catch((err) => { console.log(err) })

  console.log(`API REST running on http://localhost:${PORT}`)
})
