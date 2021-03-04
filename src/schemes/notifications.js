const Joi = require('joi').extend(require('@joi/date'))

const addNtfSchm = Joi.object({
  user: Joi.string().required(),
  message: Joi.string().required(),
  subject: Joi.string().required(),
  date: Joi.date()
    .iso()
    .max(new Date())
    .required(),
})

const updateNtfSchm = Joi.object({
  message: Joi.string(),
  subject: Joi.string(),
  date: Joi.date().max(new Date()),
})

const getOneNtfSchm = Joi.object({
  id: Joi.string().required(),
})

const getNtfsSchm = Joi.object({
  user: Joi.string(),
  subject: Joi.string(),
  date: Joi.date(),
  read: Joi.boolean(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  orderBy: Joi.string().valid('user', 'subject', 'date')
})

module.exports = {
  addNtfSchm,
  updateNtfSchm,
  getOneNtfSchm,
  getNtfsSchm,
}
