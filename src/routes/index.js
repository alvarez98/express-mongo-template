'use strict'
const express = require('express')
const router = express.Router()
const notificationsRouter = require('./notifications')

router.use('/notifications', notificationsRouter)
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Home' })
})

module.exports = router
