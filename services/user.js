require('dotenv').config();

const { JWT_SECRET } = process.env

const jwt = require('jsonwebtoken');

exports.generateToken = ({
  payload,
}) => jwt.sign(payload, JWT_SECRET);

exports.verifyToken = ({
  token,
}) => new Promise((resolve, reject) => {
  try {
    resolve(jwt.verify(token, JWT_SECRET));
  } catch (ex) {
    reject({ message: ex.message });
  }
});
