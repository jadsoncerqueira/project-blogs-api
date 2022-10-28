const { User } = require('../models');
// const { validateLogin } = require('./validation/auth');

const insert = async (email, password) => {
  const newUser = await User.create({ email, password });
  return newUser;
};

module.exports = {
  insert,
};