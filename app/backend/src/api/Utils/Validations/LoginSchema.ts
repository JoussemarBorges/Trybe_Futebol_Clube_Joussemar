import Joi = require('joi');

const loginShcema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'All fields must be filled',
  'any.email': 'Invalid email or password',
  'any.min': 'Invalid email or password',
});

export default loginShcema;
