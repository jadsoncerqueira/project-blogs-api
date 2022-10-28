const authService = require('../services/validation/auth');

const login = async (req, res) => {
  const response = authService.validateBody(req.body)
  if(response.type) return res.status(400).json({ message: response.message });

  const { email, password } = response.message;
  const { type, message } = await authService.validateLogin({ email, password });
  if(type) return res.status(400).json({ message })
  return res.status(200).json({ token: message })
};

module.exports = {
  login,
};