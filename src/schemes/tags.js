const Joi = require('joi')

const addTagSchm = Joi.object({
  name: Joi.string().required()
})

const updateTagSchm = Joi.object({
  name: Joi.string().required(),
})

const getTagSchm = Joi.object({
  id: Joi.string().uuid().required(),
})

const getTagsSchm = Joi.object({
  name: Joi.string(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  orderBy: Joi.string().valid('name', 'id')
})

module.exports = {
  addTagSchm,
  updateTagSchm,
  getTagSchm,
  getTagsSchm,
}
