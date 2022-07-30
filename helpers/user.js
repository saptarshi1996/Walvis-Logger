require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.createToken = ({
  id,
}) => jwt.sign({ id }, JWT_SECRET, {
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
