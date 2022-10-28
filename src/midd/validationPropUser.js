const validateProUser = (req, res, next) => {
  const { body } = req;
  if ('email' in body && 'password' in body) {
    next();
  } else {
    res.status(400).send({ message: 'Invalid fields' });
  }
};

module.exports = validateProUser;