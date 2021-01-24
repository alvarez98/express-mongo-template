const jwt = require('jsonwebtoken')
const { Configuration, Keys } = require('../config')

/**
 * @function generateToken
 * @description Funtion to generate token
 * @param {Object} data Token payload
 * @param {Object} time Expiration time (in minutes)
 * @return {String} token
 */

const generateToken = (data, time) =>
  jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000 + time * 60),
      ...data
    },
    Configuration.get(Keys.JWT_SECRET)
  )

module.exports = generateToken
