const Joi = require('joi')

const addTagSchm = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'El nombre de la etiqueta debe ser un texto',
    'string.empty': 'El nombre de la etiqueta no debe ser un texto vacío',
    'any.required': 'El nombre de la etiqueta es un campo requerido'
  })
})

const updateTagSchm = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'El nombre de la etiqueta debe ser un texto',
    'string.empty': 'El nombre de la etiqueta no debe ser un texto vacío'
  })
})

const getOneTagSchm = Joi.object({
  _id: Joi.string().uuid().required().messages({
    'string.base': 'El id debe ser un texto',
    'string.empty': 'El id no debe ser un texto vacío',
    'string.guid': 'El id debe ser un UUID válido',
    'any.required': 'El id es un campo requerido'
  })
})

const getTagsSchm = Joi.object({
  name: Joi.string().messages({
    'string.base': 'El nombre de la etiqueta debe ser un texto',
    'string.empty': 'El nombre de la etiqueta no debe ser un texto vacío'
  }),
  limit: Joi.number().integer().messages({
    'number.base': 'El límite debe de ser un número',
    'number.integer': 'El límite debe ser un número entero'
  }),
  offset: Joi.number().integer().messages({
    'number.base': '\'offset\' debe de ser un número',
    'number.integer': '\'offset\' debe ser un número entero'
  }),
  orderBy: Joi.string().valid('name', '_id').messages({
    'string.base': '\'orderBy\' debe de ser un texto',
    'any.only': '\'orderBy\' solo pueda tomar el valor: \'name\' ó \'_id\''
  })
})

module.exports = {
  addTagSchm,
  updateTagSchm,
  getOneTagSchm,
  getTagsSchm
}
