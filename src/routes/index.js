'use strict'
const express = require('express')
const router = express.Router()
const notificationRouter = require('./notifications')
const tagRouter = require('./tags')
const questionaryRouter = require('./questionaries')
const sectionRouter = require('./sections')
const questionRouter = require('./questions')
const answerRouter = require('./answers')

router.use('/tags', tagRouter)
router.use('/notifications', notificationRouter)
router.use('/questionaries', questionaryRouter)
router.use('/sections', sectionRouter)
router.use('/questions', questionRouter)
router.use('/answers', answerRouter)
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Home' })
})

module.exports = router
