require('dotenv').config();

const logger = require('../config/logger');

const { MIDDLEWARE_SECRET } = process.env;

module.exports = (fn) => {
  function getStatusFromRequest(method) {
    switch (method) {
      case 'POST':
        return 201;
      case 'PUT':
        return 201;
      case 'GET':
        return 200;
      case 'DELETE':
        return 200;
      default:
        return 200;
    }
  }

  return (req, res, next) => {
    fn(req, res, next).then((result) => {
      if (result.middlewareSecret && result.middlewareSecret === MIDDLEWARE_SECRET) {
        return next();
      }

      const statusCode = getStatusFromRequest(req.method);
      logger.info(`${req.method} | ${statusCode} | ${req.originalUrl}`);

      return res.status(statusCode).json(result);
    }).catch((err) => {
      const statusCode = err.statusCode || 500;

      if (!err.statusCode || statusCode === 500) {
        logger.error(err.stack);
      }

      logger.error(`${req.method} | ${statusCode} | ${req.originalUrl}`);

      return res.status(statusCode).json({
        message: err.message,
      });
    });
  };
};
