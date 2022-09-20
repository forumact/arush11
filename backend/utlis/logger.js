const { createLogger, format, transports } = require('winston');

let current = new Date();
const infoFilename = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}-info-arush11.log`;
const errorFilename = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}-error-arush11.log`;


module.exports = createLogger({
    transports: [
        new transports.File({
            level: 'info',
            filename: `logs/${infoFilename}`,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.json(),
                format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            )
        }),
        new transports.File({
            level: 'error',
            filename: `logs/${errorFilename}`,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.json(),
                format.printf(error => `${error.level}: ${[error.timestamp]}: ${error.message}`),
            )
        }),
    ]
});


