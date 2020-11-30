
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

/**
 * @function token
 * @description Funtion to generate token
 * @param {Object} data Contiene el payload del token
 * @param {Object} time Contiene el tiempo de expiración del token.
 * @return {String} retorna un token
 */

const generateToken = (data, time) =>
  jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000 + time * 60),
      ...data
    },
    SECRET
  )

module.exports = generateToken
