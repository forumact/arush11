const { createLogger, format, transports } = require('winston');

let mydate = new Date();
let infoFilename = mydate.getFullYear() + "-" + mydate.getMonth() + "-" + mydate.getDate() + "-" + "info-ra11.log";
let errorFilename = mydate.getFullYear() + "-" + mydate.getMonth() + "-" + mydate.getDate() + "-" + "error-ra11.log";


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


