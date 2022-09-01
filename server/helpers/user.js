require('dotenv').config();

const jwt = require('jsonwebtoken');

const {
  JWT_SECRET,
  USER_NAME,
  PASSWORD,
} = process.env;

exports.createToken = ({
  username,
}) => jwt.sign({ username }, JWT_SECRET, {
  expiresIn: 60 * 60 * 3600,
});

exports.verifyToken = ({
  token,
}) => new Promise((resolve, reject) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    resolve(decoded);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.checkUser = ({
  username,
}) => USER_NAME === username;

exports.checkPassword = ({
  password,
}) => PASSWORD === password;
