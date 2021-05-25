const Joi = require('joi')

const addAnswerSchm = Joi.object({
  studentId: Joi.string().uuid().required().messages({
    'string.base': 'El identificador del estudiante debe ser un texto',
    'string.empty': 'El identificador del estudiante no debe ser un texto vacío',
    'string.guid': 'El identificador del estudiante debe ser un UUID válido',
    'any.required': 'El identificador del estudiante es un campo requerido'
  }),
  answers: Joi.array()
    .items(
      Joi.object({
        questionId: Joi.string().uuid().required().messages({
          'string.base': 'El identificador de la pregunta debe ser un texto',
          'string.empty': 'El identificador de la pregunta no debe ser un texto vacío',
          'string.guid': 'El identificador de la pregunta debe ser un UUID válido',
          'any.required': 'El identificador de la pregunta es un campo requerido'
        }),
        questionAnswer: Joi.alternatives()
          .try(Joi.array().items(Joi.string().messages({
            'string.base': 'La respuesta a la pregunta debe ser un texto',
            'string.empty': 'La respuesta a la pregunta no debe ser un texto vacío',
            'any.required': 'La respuesta a la pregunta es un campo requerido'
          })), Joi.string().messages({
            'string.base': 'La respuesta a la pregunta debe ser un texto',
            'string.empty': 'La respuesta a la pregunta no debe ser un texto vacío',
            'any.required': 'La respuesta a la pregunta es un campo requerido'
          }))
          .required()
      })
    )
    .required().messages({
      'array.base': '\'answers\' debe ser una lista de respuestas',
      'any.required': '\'answers\' es un campo requerido'
    })
})
const addAnswerParamsSchm = Joi.object({
  questionaryId: Joi.string().uuid().required().messages({
    'string.base': 'El identificador del cuestionario debe ser un texto',
    'string.empty': 'El identificador del cuestionario no debe ser un texto vacío',
    'string.guid': 'El identificador del cuestionario debe ser un UUID válido',
    'any.required': 'El identificador del cuestionario es un campo requerido'
  }),
  sectionId: Joi.string().uuid().required().messages({
    'string.base': 'El identificador de la sección debe ser un texto',
    'string.empty': 'El identificador de la sección no debe ser un texto vacío',
    'string.guid': 'El identificador de la sección debe ser un UUID válido',
    'any.required': 'El identificador de la sección es un campo requerido'
  })
})

const getOneAnswerSchm = Joi.object({
  _id: Joi.string().uuid().required().messages({
    'string.base': 'El identificador debe ser texto',
    'string.empty': 'El identificador no debe ser un texto vacío',
    'string.guid': 'El identificador debe ser un UUID válido',
    'any.required': 'El identificador es un campo requerido'
  })
})

const getAnswersByQuestionarySchm = Joi.object({
  questionaryId: Joi.string().uuid().required().messages({
    'string.base': 'El identificador del cuestionario debe ser un texto',
    'string.empty': 'El identificador del cuestionario no debe ser un texto vacío',
    'string.guid': 'El identificador del cuestionario debe ser un UUID válido',
    'any.required': 'El identificador del cuestionario es un campo requerido'
  }),
  sectionId: Joi.string().uuid().required().messages({
    'string.base': 'El identificador de la sección debe ser un texto',
    'string.empty': 'El identificador de la sección no debe ser un texto vacío',
    'string.guid': 'El identificador de la sección debe ser un UUID válido',
    'any.required': 'El identificador de la sección es un campo requerido'
  }),
  studentId: Joi.string().uuid().required().messages({
    'string.base': 'El identificador del estudiante debe ser un texto',
    'string.empty': 'El identificador del estudiante no debe ser un texto vacío',
    'string.guid': 'El identificador del estudiante debe ser un UUID válido',
    'any.required': 'El identificador del estudiante es un campo requerido'
  })
})

const getAnswersQuerySchm = Joi.object({
  limit: Joi.number().integer().messages({
    'number.base': 'El límite debe de ser un número',
    'number.integer': 'El límite debe ser un número entero'
  }),
  offset: Joi.number().integer().messages({
    'number.base': '\'offset\' debe de ser un número',
    'number.integer': '\'offset\' debe ser un número entero'
  })
})

module.exports = {
  addAnswerSchm,
  addAnswerParamsSchm,
  getAnswersByQuestionarySchm,
  getOneAnswerSchm,
  getAnswersQuerySchm
}
