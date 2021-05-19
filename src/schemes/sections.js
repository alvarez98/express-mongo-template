const Joi = require('joi')

const addSectionSchm = Joi.object({
  sectionName: Joi.string().required().messages({
    'string.base': 'El nombre de la sección debe ser un texto',
    'string.empty': 'El nombre de la sección no debe ser un texto vacío',
    'any.required': 'El nombre de la sección es un campo requerido'
  }),
  sectionDescription: Joi.string().required().messages({
    'string.base': 'La descripción de la sección debe ser un texto',
    'string.empty': 'La descripción de la sección no debe ser un texto vacío',
    'any.required': 'La descripción de la sección es un campo requerido'
  }),
  sectionQuestions: Joi.array()
    .items(
      Joi.string().uuid().messages({
        'string.base': 'Cada valor de la lista debe ser un texto',
        'string.empty': 'Cada valor de la lista no debe ser un texto vacío',
        'string.guid': 'Cada valor de la lista debe ser un UUID válido'
      })
    )
    .required()
    .messages({
      'array.base': '\'sectionQuestions\' debe ser una lista de preguntas',
      'any.required': 'La lista de preguntas es un campo requerido'
    })
})

const updateSectionSchm = Joi.object({
  sectionName: Joi.string().messages({
    'string.base': 'El nombre de la sección debe ser un texto',
    'string.empty': 'El nombre de la sección no debe ser un texto vacío'
  }),
  sectionDescription: Joi.string().messages({
    'string.base': 'La descripción de la sección debe ser un texto',
    'string.empty': 'La descripción de la sección no debe ser un texto vacío'
  }),
  sectionQuestions: Joi.array()
    .items(
      Joi.string().uuid().messages({
        'string.base': 'Cada valor de la lista debe ser un texto',
        'string.empty': 'Cada valor de la lista no debe ser un texto vacío',
        'string.guid': 'Cada valor de la lista debe ser un UUID válido'
      })
    )
    .messages({
      'array.base': '\'sectionQuestions\' debe ser una lista de preguntas'
    })
})

const getOneSectionSchm = Joi.object({
  _id: Joi.string().uuid().required().messages({
    'string.base': 'El id debe ser un texto',
    'string.empty': 'El id no debe ser un texto vacío',
    'string.guid': 'El id debe ser un UUID válido',
    'any.required': 'El id es un campo requerido'
  })
})

const getSectionsSchm = Joi.object({
  sectionName: Joi.string().messages({
    'string.base': 'El nombre de la sección debe ser un texto',
    'string.empty': 'El nombre de la sección no debe ser un texto vacío'
  }),
  limit: Joi.number().integer().messages({
    'number.base': 'El límite debe de ser un número',
    'number.integer': 'El límite debe ser un número entero'
  }),
  offset: Joi.number().integer().messages({
    'number.base': '\'offset\' debe de ser un número',
    'number.integer': '\'offset\' debe ser un número entero'
  }),
  orderBy: Joi.string().valid('sectionName', '_id').messages({
    'string.base': '\'orderBy\' debe de ser un texto',
    'any.only': '\'orderBy\' solo pueda tomar el valor: \'sectionName\' ó \'_id\''
  })
})

module.exports = {
  addSectionSchm,
  updateSectionSchm,
  getOneSectionSchm,
  getSectionsSchm
}
