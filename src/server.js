'use strict'
const connection = require('./db/config')
const app = require('./app')
const { Configuration, Keys } = require('./config')
const PORT = Configuration.get(Keys.SERVER_PORT) || 5000

// Start server
app.listen(PORT, () => {
  connection()
    .then(() => {
      console.log('Database is connected')
    })
    .catch((err) => {
      console.error(err)
    })

  console.log(`API REST running on http://localhost:${PORT}`)
})
