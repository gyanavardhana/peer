const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const devLogger = () => {
    const myFormat = printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
      });
    
    return createLogger({
        level: 'debug',
        format: combine(
            format.colorize(),
            timestamp({format: "HH:mm:ss"}),
            myFormat
          ),
        transports: [
            new transports.Console(),
        ],
      });
}

  module.exports = devLogger;