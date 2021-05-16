const Joi = require('joi')

const addAnswerSchm = Joi.object({
  questionaryId: Joi.string().uuid().required().messages({
    'string.base': 'El id del cuestionario debe ser un texto',
    'string.empty': 'El id del cuestionario no debe ser un texto vacío',
    'string.guid': 'El id del cuestionario debe ser un UUID válido',
    'any.required': 'El id del cuestionario es un campo requerido'
  }),
  sectionId: Joi.string().uuid().required().messages({
    'string.base': 'El id de la sección debe ser un texto',
    'string.empty': 'El id de la sección no debe ser un texto vacío',
    'string.guid': 'El id de la sección debe ser un UUID válido',
    'any.required': 'El id de la sección es un campo requerido'
  }),
  studentId: Joi.string().uuid().required().messages({
    'string.base': 'El id del estudiante debe ser un texto',
    'string.empty': 'El id del estudiante no debe ser un texto vacío',
    'string.guid': 'El id del estudiante debe ser un UUID válido',
    'any.required': 'El id del estudiante es un campo requerido'
  }),
  answers: Joi.array()
    .items(
      Joi.object({
        questionId: Joi.string().uuid().required(),
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

const getOneAnswerSchm = Joi.object({
  _id: Joi.string().uuid().required().messages({
    'string.base': 'El id debe ser texto',
    'string.empty': 'El id no debe ser un texto vacío',
    'string.guid': 'El id debe ser un UUID válido',
    'any.required': 'El id es un campo requerido'
  })
})

const getAnswersSchm = Joi.object({
  answerDate: Joi.array()
    .items(
      Joi.date().required().messages({
        'date.base': 'El primer campo debe ser una fecha',
        'any.required': 'El primer campo es requerido'
      }),
      Joi.string().valid('equal', 'greater', 'less').required().messages({
        'string.base': 'El segundo campo debe ser texto',
        'any.only': 'El segundo campo solo pueda tomar el valor: \'equal\', \'greater\' ó \'less\''
      })
    )
    .length(2).messages({
      'array.base': '\'answerDate\' debe ser una lista'
    }),
  limit: Joi.number().integer().messages({
    'number.base': 'El límite debe de ser un número',
    'number.integer': 'El límite debe ser un número entero'
  }),
  offset: Joi.number().integer().messages({
    'number.base': '\'offset\' debe de ser un número',
    'number.integer': '\'offset\' debe ser un número entero'
  }),
  orderBy: Joi.string().valid('questionId', 'studentId').messages({
    'string.base': '\'orderBy\' debe de ser un texto',
    'any.only': '\'orderBy\' solo pueda tomar el valor: \'questionId\' ó \'studentId\''
  })
})

module.exports = {
  addAnswerSchm,
  getOneAnswerSchm,
  getAnswersSchm
}
