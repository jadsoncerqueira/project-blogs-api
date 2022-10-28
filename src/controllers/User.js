const { userService } = require('../services');
const { mapError } = require('../../map');
const { createToken } = require('../utils/jwt');

const insertUser = async (req, res) => {
  const response = await userService.insert(req.body);
  if (response.type) return res.status(mapError(response.type)).json({ message: response.message });
  const { displayName, email } = response.message;
  return res.status(201).json({ token: createToken({ displayName, email }) });
};

module.exports = {
  insertUser,
};