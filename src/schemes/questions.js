const Joi = require('joi')

const addQuestionSchm = Joi.object({
  question: Joi.string().required().messages({
    'string.base': 'La pregunta debe ser un texto',
    'string.empty': 'La pregunta no debe ser un texto vacío',
    'any.required': 'La pregunta es un campo requerido'
  }),
  questionType: Joi.string()
    .valid('MultipleOption', 'Checkbox', 'Text')
    .required()
    .messages({
      'string.base': 'El tipo de pregunta debe de ser un texto',
      'any.only': 'El tipo de pregunta solo pueda tomar el valor: \'MultipleOption\', \'Checkbox\' ó \'Text\''
    }),
  questionOptions: Joi.alternatives()
    .conditional('questionType', [
      {
        is: Joi.string().valid('Checkbox', 'MultipleOption'),
        then: Joi.array()
          .items(
            Joi.string().messages({
              'string.base': 'Las valores de la lista deben ser textos'
            })
          )
          .required()
          .messages({
            'array.base': 'Las opciones de la pregunta debe ser una lista',
            'any.required': 'Las opciones de la pregunta es un campo requerido'
          }),
        otherwise: Joi.forbidden()
      }
    ])
    .required()
})

const updateQuestionSchm = Joi.object({
  question: Joi.string(),
  questionType: Joi.string().valid('MultipleOption', 'Checkbox', 'Text'),
  questionOptions: Joi.alternatives()
    .conditional('questionType', [
      {
        is: Joi.string().valid('Checkbox', 'MultipleOption'),
        then: Joi.array()
          .items(
            Joi.string().messages({
              'string.base': 'Las valores de la lista deben ser textos'
            })
          )
          .required()
          .messages({
            'array.base': 'Las opciones de la pregunta debe ser una lista',
            'any.required': 'Las opciones de la pregunta es un campo requerido'
          }),
        otherwise: Joi.forbidden()
      }
    ])
    .required()
})

const getOneQuestionSchm = Joi.object({
  _id: Joi.string().uuid().required().messages({
    'string.base': 'El id debe ser un texto',
    'string.empty': 'El id no debe ser un texto vacío',
    'string.guid': 'El id debe ser un UUID válido',
    'any.required': 'El id es un campo requerido'
  })
})

const getQuestionsSchm = Joi.object({
  question: Joi.string().messages({
    'string.base': 'La pregunta debe ser un texto',
    'string.empty': 'La pregunta no debe ser un texto vacío',
    'any.required': 'La pregunta es un campo requerido'
  }),
  questionType: Joi.string()
    .valid('MultipleOption', 'Checkbox', 'Text')
    .messages({
      'string.base': 'El tipo de pregunta debe ser texto',
      'any.only': 'El tipo de pregunta solo pueda tomar alguno de los valores: \'MultipleOption\', \'Checkbox\', \'Text\''
    }),
  limit: Joi.number().integer().messages({
    'number.base': 'El límite debe de ser un número',
    'number.integer': 'El límite debe ser un número entero'
  }),
  offset: Joi.number().integer().messages({
    'number.base': '\'offset\' debe de ser un número',
    'number.integer': '\'offset\' debe ser un número entero'
  }),
  orderBy: Joi.string().valid('questionType', '_id').messages({
    'string.base': '\'orderBy\' debe de ser un texto',
    'any.only': '\'orderBy\' solo pueda tomar el valor: \'questionType\' ó \'_id'
  })
})

module.exports = {
  addQuestionSchm,
  updateQuestionSchm,
  getOneQuestionSchm,
  getQuestionsSchm
}
