require('dotenv').config();
const { USERNAME, PASSWORD } = process.env;

const userService = require('../services/user');

exports.userLogin = (req, res) => {
  try {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
      // create a token
      const token = userService.generateToken({
        payload: JSON.stringify({ username }),
      });
      return res.status(200).json({ token });
    } else {
      return res.status(403).json({
        message: 'Invalid username or password',
      });
    }
  } catch (ex) {
    return res.status(500).json({ message: ex.message });
  }
};

exports.userDetails = (req, res) => {
  try {
    return res.status(200).json({
      username: USERNAME,
    });
  } catch (ex) {
    return res.status(500).json({ message: ex.message });
  }
};
