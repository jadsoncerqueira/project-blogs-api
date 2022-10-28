const { userService } = require('../services');

const insertUser = async (req, res) => {
  const { email, password } = req.body;
  const newUser = await userService.insert( email, password);
  res.status(201).json(newUser);
};

module.exports = {
  insertUser,
};