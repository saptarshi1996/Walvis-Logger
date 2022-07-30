const userHelper = require('../helpers/user');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const user = await userHelper.verifyToken({ authorization });

    if (!user) {
      throw new Error('Invalid credentials');
    } else {
      req.user = user;
      return next();
    }
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};
