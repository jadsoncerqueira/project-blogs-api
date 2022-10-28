const Joi = require('joi');

const validationLogin = Joi.object({
  email: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
});

module.exports = {
  validationLogin,
};