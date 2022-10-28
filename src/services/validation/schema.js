const Joi = require('joi');

const validationLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const valDisplayName = Joi.string().min(8).required();
const valEmail = Joi.string().email().required();
const valPassword = Joi.string().min(6).required();

module.exports = {
  validationLogin,
  valDisplayName,
  valEmail,
  valPassword,
};