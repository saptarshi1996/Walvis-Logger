const userHelper = require('../helpers/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

exports.userLogin = async (req, res) => {
  try {
    const {
      username,
      password,
    } = req.body;

    const userExists = userHelper.checkUser({ username })
    if (!userExists) {
      throw new NotFoundError('User does not exists');
    }

    const passwordMatch = userHelper.checkPassword({ password })
    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const token = userHelper.createToken({ username });
    return res.status(200).json({
      token,
    });
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
      message: ex.message,
    });
  }
};

exports.userDetails = (req, res) => {
  try {
    const { user } = req;
    return res.status(200).json(user);
  } catch (ex) {
    return res.status(ex.statusCode || 500).json({
      message: ex.message,
    });
  }
};
