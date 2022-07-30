const userHelper = require('../helpers/user');

exports.userLogin = async (req, res) => {
  try {
    const {
      username,
      password,
    } = req.body;

    if (!userHelper.checkUser({
      username,
    })) {
      throw new Error('User does not exists');
    }

    if (userHelper.checkPassword({
      password,
    })) {
      throw new Error('Invalid credentials');
    }

    const token = userHelper.createToken({
      username,
    });

    return res.status(200).json({
      token,
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};

exports.userDetails = (req, res) => {
  try {
    const { user } = req;
    return res.status(200).json({
      user,
    });
  } catch (ex) {
    return res.status(500).json({
      message: ex.message,
    });
  }
};
