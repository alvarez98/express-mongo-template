const Joi = require('joi')

const addTagSchm = Joi.object({
  sk: Joi.string()
    .regex(/^profile-[0-9]+-[0-9]+$/)
    .required()
    .messages({
      'string.base': `"sk" should be a type of 'text'`,
      'string.empty': `"sk" cannot be an empty field`,
      'string.pattern.base': `Invalid profile id`,
      'any.required': `"sk" is a required field`,
    }),
  company_name: Joi.string().required(),
  name: Joi.string().required(),
  date_start: Joi.string().required(),
  date_end: Joi.date().min(Joi.ref('date_start')),
  country: Joi.string().required(),
  state: Joi.string().required(),
  subarea_name: Joi.string().required(),
  area_name: Joi.string().required(),
  activities: Joi.array().items(Joi.string()).required(),
})

const updateTagSchm = Joi.object({
  company_name: Joi.string(),
  name: Joi.string(),
  date_start: Joi.string(),
  date_end: Joi.date().min(Joi.ref('date_start')),
  country: Joi.string(),
  state: Joi.string(),
  subarea_name: Joi.string(),
  area_name: Joi.string(),
  activities: Joi.array().items(Joi.string()),
})

const getTagSchm = Joi.object({
  id: Joi.string().required(),
})

const getTagsSchm = Joi.object({
  id: Joi.string(),
  company_name: Joi.string(),
  name: Joi.string(),
  sk: Joi.string()
    .regex(/^profile-[0-9]+-[0-9]+$/)
    .messages({
      'string.base': `"sk" should be a type of 'text'`,
      'string.empty': `"sk" cannot be an empty field`,
      'string.pattern.base': `Invalid profile id`,
      'any.required': `"sk" is a required field`,
    }),
})

module.exports = {
  addTagSchm,
  updateTagSchm,
  getTagSchm,
  getTagsSchm,
}
