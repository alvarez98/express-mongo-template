const Joi = require('joi')

const addConnSchm = Joi.object({
  user: Joi.string().uuid().required()
}).unknown(true)

const updateConnSchm = Joi.object({
  message: Joi.string(),
  subject: Joi.string(),
  date: Joi.date().max(new Date())
})

const getOneConnSchm = Joi.object({
  _id: Joi.string().uuid().required()
})

const getConnsSchm = Joi.object({
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
  addConnSchm,
  updateConnSchm,
  getOneConnSchm,
  getConnsSchm
}
