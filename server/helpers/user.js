require('dotenv').config();

const jwt = require('jsonwebtoken');

const UnAuthenticatedError = require('../errors/UnAuthenticatedError');

const {
  JWT_SECRET,
  USER_NAME,
  PASSWORD,
} = process.env;

exports.createToken = ({ username }) => jwt.sign({ username }, JWT_SECRET, { expiresIn: 60 * 60 * 3600 });

exports.verifyToken = ({ token }) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (ex) {
    throw new UnAuthenticatedError(ex.message);
  }
};

exports.checkUser = ({ username }) => USER_NAME === username;

exports.checkPassword = ({ password }) => PASSWORD === password;
