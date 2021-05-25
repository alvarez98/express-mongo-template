const Joi = require('joi')

const addQuestionarySchm = Joi.object({
  questionaryName: Joi.string().required().messages({
    'string.base': 'El nombre del cuestionario debe ser un texto',
    'string.empty': 'El nombre del cuestionario no debe ser un texto vacío',
    'any.required': 'El nombre del cuestionario es un campo requerido'
  }),
  questionaryDescription: Joi.string().required().messages({
    'string.base': 'La descripción debe ser un texto',
    'string.empty': 'La descripción no debe ser un texto vacío',
    'any.required': 'La descripción es un campo requerido'
  }),
  questionaryAudicence: Joi.string().required().messages({
    'string.base': 'La audiencia debe ser un texto',
    'string.empty': 'La audiencia no debe ser un texto vacío',
    'any.required': 'La audiencia es un campo requerido'
  }),
  questionarySections: Joi.array()
    .items(
      Joi.string().uuid().messages({
        'string.base': 'El valor de la lista debe ser un texto',
        'string.empty': 'El valor de la lista no debe ser un texto vacío',
        'string.guid': 'El valor de la lista debe ser un UUID válido'
      })
    )
    .required()
    .required()
    .messages({
      'array.base': '\'questionarySections\' debe ser una lista de secciones',
      'any.required': 'La lista de secciones es un campo requerido'
    })
})

const updateQuestionarySchm = Joi.object({
  questionaryName: Joi.string().messages({
    'string.base': 'El nombre del cuestionario debe ser un texto',
    'string.empty': 'El nombre del cuestionario no debe ser un texto vacío'
  }),
  questionaryDescription: Joi.string().messages({
    'string.base': 'La descripción debe ser un texto',
    'string.empty': 'La descripción no debe ser un texto vacío'
  }),
  questionaryAudicence: Joi.string().messages({
    'string.base': 'La audiencia debe ser un texto',
    'string.empty': 'La audiencia no debe ser un texto vacío'
  }),
  questionarySections: Joi.array()
    .items(
      Joi.string().uuid().messages({
        'string.base': 'El valor de la lista debe ser un texto',
        'string.empty': 'El valor de la lista no debe ser un texto vacío',
        'string.guid': 'El valor de la lista debe ser un UUID válido'
      })
    )
    .messages({
      'array.base': '\'questionarySections\' debe ser una lista de secciones',
      'any.required': 'La lista de secciones es un campo requerido'
    })
})

const getUnansweredSectionsSchm = Joi.object({
  questionaryId: Joi.string().uuid().required().messages({
    'string.base': 'El id del cuestionario debe ser un texto',
    'string.empty': 'El id del cuestionario no debe ser un texto vacío',
    'string.guid': 'El id del cuestionario debe ser un UUID válido',
    'any.required': 'El id del cuestionario es un campo requerido'
  }),
  studentId: Joi.string().uuid().required().messages({
    'string.base': 'El id del estudiante debe ser un texto',
    'string.empty': 'El id del estudiante no debe ser un texto vacío',
    'string.guid': 'El id del estudiante debe ser un UUID válido',
    'any.required': 'El id del estudiante es un campo requerido'
  }),
})

const getOneQuestionarySchm = Joi.object({
  _id: Joi.string().uuid().required().messages({
    'string.base': 'El id debe ser un texto',
    'string.empty': 'El id no debe ser un texto vacío',
    'string.guid': 'El id debe ser un UUID válido',
    'any.required': 'El id es un campo requerido'
  })
})

const getQuestionariesSchm = Joi.object({
  questionaryName: Joi.string().messages({
    'string.base': 'El nombre del cuestionario debe ser un texto',
    'string.empty': 'El nombre del cuestionario no debe ser un texto vacío',
    'any.required': 'El nombre del cuestionario es un campo requerido'
  }),
  limit: Joi.number().integer().messages({
    'number.base': 'El límite debe de ser un número',
    'number.integer': 'El límite debe ser un número entero'
  }),
  offset: Joi.number().integer().messages({
    'number.base': '\'offset\' debe de ser un número',
    'number.integer': '\'offset\' debe ser un número entero'
  }),
  orderBy: Joi.string()
    .valid('questionaryName', 'questionaryAudicence', '_id')
    .messages({
      'string.base': '\'orderBy\' debe de ser un texto',
      'any.only': '\'orderBy\' solo pueda tomar el valor: \'questionaryName\' ó \'questionaryAudicence\''
    })
})

module.exports = {
  addQuestionarySchm,
  updateQuestionarySchm,
  getOneQuestionarySchm,
  getQuestionariesSchm,
  getUnansweredSectionsSchm
}
