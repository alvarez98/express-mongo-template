const { v4: uuidv4 } = require('uuid')

/**
 * @function generateID
 * @description Uuid generator
 * @return {String} uuid
 */
const generateID = () => uuidv4()

module.exports = generateID
