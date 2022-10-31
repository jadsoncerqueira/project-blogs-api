const { User } = require('../models');
const { valDisplayName, valEmail, valPassword } = require('./validation/schema');

const insert = async ({ displayName, email, password, image }) => {
  const user = await User.findOne({ where: { email } });
  if (user) return { type: 'USER_REGISTED', message: 'User already registered' };

  const errorName = valDisplayName.validate(displayName);
  if (errorName.error) {
    return {
      type: 'INVALID_VALUE', message: '"displayName" length must be at least 8 characters long',
    };
  }

  const errorEmail = valEmail.validate(email);
  if (errorEmail.error) return { type: 'INVALID_VALUE', message: '"email" must be a valid email' };

  const errorPassword = valPassword.validate(password);
  if (errorPassword.error) {
    return {
      type: 'INVALID_VALUE', message: '"password" length must be at least 6 characters long',
    };
  }

  const newUser = await User.create({ displayName, email, password, image });
  return { type: null, message: newUser };
};

const getUsers = async () => {
  const users = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return users;
};

const getUser = async (id) => {
  const user = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'], where: { id },
  });
  return user;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
  return { type: null, message: '' };
};

module.exports = {
  insert,
  getUsers,
  getUser,
  deleteUser,
};