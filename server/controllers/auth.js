const {
  checkUser,
  createToken,
  checkPassword,
} = require('../helpers/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

exports.userLogin = async (req) => {
  const { username, password } = req.body;

  const userExists = checkUser({ username });
  if (!userExists) {
    throw new NotFoundError('User does not exists');
  }

  const passwordMatch = checkPassword({ password });
  if (!passwordMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  const token = createToken({ username });
  return { token };
};

exports.userDetails = async (req) => {
  const { user } = req;
  return user;
};
