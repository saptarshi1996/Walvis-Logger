require('dotenv').config();

const wrapAsync = require('./wrap-async');

const { verifyToken } = require('../helpers/user');

const UnAuthenticatedError = require('../errors/UnAuthenticatedError');

const { MIDDLEWARE_SECRET } = process.env;

async function authMiddleware(req) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnAuthenticatedError('Invalid token');
  }

  // split token to get bearer header.
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw new UnAuthenticatedError('Invalid token');
  }

  const user = verifyToken({ token });

  if (!user) {
    throw new UnAuthenticatedError('Invalid credentials');
  }

  req.user = { username: user.username };
  return { middlewareSecret: MIDDLEWARE_SECRET };
}

module.exports = wrapAsync(authMiddleware);
