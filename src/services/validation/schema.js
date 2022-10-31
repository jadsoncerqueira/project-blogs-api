const Joi = require('joi');

const fieldsRequired = 'Some required fields are missing';

const validationLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validationPost = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': fieldsRequired,
  }),
  content: Joi.string().required().messages({
    'string.empty': fieldsRequired,
  }),
  categoryIds: Joi.array().items(Joi.number().min(1).required()).required().messages({
    'array.empty': fieldsRequired,
    'string.empty': fieldsRequired,
  }),
});

const valDisplayName = Joi.string().min(8).required();
const valEmail = Joi.string().email().required();
const valPassword = Joi.string().min(6).required();

module.exports = {
  validationLogin,
  valDisplayName,
  valEmail,
  valPassword,
  validationPost,
};
