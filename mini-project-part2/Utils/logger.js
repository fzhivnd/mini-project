pino = require('pino');

// Utils for logger
const levels ={
    http : 10,
    debug : 20,
    info : 30,
    warn : 40,
    error : 50,
    fatal : 60
};


const logger = pino({
    customLevels : levels,
    useOnlyCustomLevels: true,
    level: "http",
    prettyPrint: {
        colorize: true, // colorizes the log
        levelFirst: true,
        translateTime: 'SYS:yyyy-dd-mm, h:MM:ss TT',
      }
});

module.exports = logger;