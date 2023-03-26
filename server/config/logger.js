const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.printf(
          ({ level, message, timestamp }) => (`${(timestamp)} [${level.toUpperCase()}] ${(message)}`)
        )
      )
    })
  ]
});

module.exports = logger;
