const { userService } = require('../services');
const { mapError } = require('../../map');
const { createToken } = require('../utils/jwt');

const insertUser = async (req, res) => {
  const response = await userService.insert(req.body);
  if (response.type) return res.status(mapError(response.type)).json({ message: response.message });
  const { displayName, email } = response.message;
  return res.status(201).json({ token: createToken({ displayName, email }) });
};

const getUsers = async (_req, res) => {
 const response = await userService.getUsers();
 return res.status(200).json(response);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const response = await userService.getUser(Number(id));
  if (response.length === 0) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(response[0]);
};

module.exports = {
  insertUser,
  getUsers,
  getUser,
};