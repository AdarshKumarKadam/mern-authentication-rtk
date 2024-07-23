const winston = require('winston');

const {combine , timestamp, prettyPrint, json}=winston.format


const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    prettyPrint(),
    json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
