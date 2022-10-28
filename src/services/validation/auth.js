const { validationLogin } = require('./schema');
const { User } = require('../../models');
const { createToken } = require('../../utils/jwt');

const validateBody = (credenciais) => {
  const { error, value } = validationLogin.validate(credenciais);
  if (error) return { type: 'INVALID_VALUE', message: 'Some required fields are missing' };
  return { type: null, message: value };
};

const validateLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { type: 'Não autorizado', message: 'Invalid fields' };
  }

  const { id, displayName } = user.dataValues;

  const token = createToken({ id, displayName, email });

  return { type: null, message: token };
};

module.exports = {
  validateBody,
  validateLogin,
};
