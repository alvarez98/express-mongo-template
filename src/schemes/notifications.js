const Joi = require('joi')

const addNtfSchm = Joi.object({
  user: Joi.string().uuid().required().messages({
    'string.base': 'El id de usuario debe ser un texto',
    'string.empty': 'El id de usuario no debe ser un texto vacío',
    'string.guid': 'El id de usuario debe ser un UUID válido',
    'any.required': 'El id de usuario es un campo requerido'
  }),
  message: Joi.string().required().messages({
    'string.base': 'El mensaje debe ser un texto',
    'string.empty': 'El mensaje no debe ser un texto vacío',
    'any.required': 'El mensaje es un campo requerido'
  }),
  subject: Joi.string().required().messages({
    'string.base': 'El asunto debe ser un texto',
    'string.empty': 'El asunto no debe ser un texto vacío',
    'any.required': 'El asunto es un campo requerido'
  }),
  date: Joi.date()
    .max(new Date().getTime() + 1000)
    .required()
    .messages({
      'date.base': '\'date\' debe ser una fecha válida',
      'date.max': `'date' debe ser una fecha menor a ${
        new Date().getTime() + 1000
      }`,
      'any.required': '\'date\' es un campo requerido'
    })
})

const updateNtfSchm = Joi.object({
  message: Joi.string().messages({
    'string.base': 'El mensaje debe ser un texto',
    'string.empty': 'El mensaje no debe ser un texto vacío'
  }),
  subject: Joi.string().messages({
    'string.base': 'El asunto debe ser un texto',
    'string.empty': 'El asunto no debe ser un texto vacío'
  }),
  date: Joi.date()
    .max(new Date().getTime() + 1000)
    .messages({
      'date.base': '\'date\' debe ser una fecha válida',
      'date.max': `'date' debe ser una fecha menor a ${
        new Date().getTime() + 1000
      }`
    }),
  read: Joi.boolean().messages({
    'boolean.base': '\'read\' solo debe de ser un valor booleano'
  })
})

const getOneNtfSchm = Joi.object({
  _id: Joi.string().uuid().required().messages({
    'string.base': 'El id debe ser un texto',
    'string.empty': 'El id no debe ser un texto vacío',
    'string.guid': 'El id debe ser un UUID válido',
    'any.required': 'El id es un campo requerido'
  })
})

const getNtfsSchm = Joi.object({
  subject: Joi.string().messages({
    'string.base': 'El asunto debe ser un texto',
    'string.empty': 'El asunto no debe ser un texto vacío'
  }),
  date: Joi.array()
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
    .length(2),
  read: Joi.boolean().messages({
    'boolean.base': '\'read\' solo debe de ser un valor booleano'
  }),
  limit: Joi.number().integer().messages({
    'number.base': 'El límite debe de ser un número',
    'number.integer': 'El límite debe ser un número entero'
  }),
  offset: Joi.number().integer().messages({
    'number.base': '\'offset\' debe de ser un número',
    'number.integer': '\'offset\' debe ser un número entero'
  }),
  orderBy: Joi.string().valid('user', 'subject', 'date').messages({
    'string.base': '\'orderBy\' debe de ser un texto',
    'any.only': '\'orderBy\' solo pueda tomar el valor: \'user\', \'subject\' ó \'date\''
  })
})

module.exports = {
  addNtfSchm,
  updateNtfSchm,
  getOneNtfSchm,
  getNtfsSchm
}
