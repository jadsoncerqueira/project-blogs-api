const validateProUser = (req, res, next) => {
  const { body } = req;
  if ('email' in body && 'password' in body) {
    next();
  } else {
    res.status(400).send({ message: 'Invalid fields' });
  }
};

const validateInsertUser = (req, res, next) => {
  const props = ['displayName', 'email', 'password', 'image'];
  const { body } = req;
  const validateProps = props.every((el) => el in body);

  if (validateProps) {
    next();
  } else {
    res.status(400).send({ message: 'Os campos são obrigatórios' });
  }
};

module.exports = {
  validateProUser,
  validateInsertUser,
};