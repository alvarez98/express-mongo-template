const Joi = require('joi')

const addNtfSchm = Joi.object({
  user: Joi.string().uuid().required(),
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
  id: Joi.string().uuid().required(),
})

const getNtfsSchm = Joi.object({
  user: Joi.string().uuid(),
  subject: Joi.string(),
  date: Joi.array()
  .items(
    Joi.date().required(),
    Joi.string().valid('equal', 'greater', 'less').required()
  )
  .length(2),
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
