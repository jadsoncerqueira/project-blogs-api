const { valToken } = require('../services/validation/auth');
const { mapError } = require('../../map');

const tokenValidate = (req, res, next) => {
  const { authorization } = req.headers;
  const response = valToken(authorization);
  if (response.type) {
    res.status(mapError(response.type)).json({ message: response.message });
  } else {
    next();
  }
};

module.exports = { tokenValidate };
