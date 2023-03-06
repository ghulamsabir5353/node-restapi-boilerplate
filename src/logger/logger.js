const { createLogger, transports, format } = require('winston');
require('winston-mongodb');

const config = require('@config');

const myFormat = format.printf((format) => {
  return `{time: "${format.timestamp}", level: "${format.level}", message: "${
    format.message
  }", data: ${JSON.stringify(format.data)}}`;
});

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.prettyPrint(),
        myFormat
      ),
    }),
    new transports.MongoDB({
      level: 'info',
      db: config.db,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      metaKey: 'data',
      collection: 'logs',
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.printf((format) => {
          return `{time: "${format.timestamp}", level: "${format.level}", message: "${format.message}", data: "${format.data}"}`;
        })
      ),
    }),

    new transports.File({
      level: 'info',
      filename: 'info.log',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),

        format.printf((format) => {
          return `{time: "${format.timestamp}", level: "${format.level}", message: "${format.message}", data: ${format.data}}`;
        })
      ),
    }),
    new transports.File({ level: 'error', filename: 'error.logs' }),
  ],
});

module.exports = logger;
