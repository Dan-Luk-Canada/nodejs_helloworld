// ref : https://www.section.io/engineering-education/logging-with-winston/
const winston = require('winston');

const logConfiguration = {
    'transports': [
        //new winston.transports.Console()
        //new winston.transports.File({filename: 'logs/example.log'})
        
        new winston.transports.File({
            level: 'error',
            filename: 'logs/example_error.log'
        }),
        new winston.transports.File({
            level: 'warn',
            filename: 'logs/example_warn.log'
        }),
        new winston.transports.File({
            level: 'info',
            filename: 'logs/example.log'
        }),
        new winston.transports.Console({
            level: 'http'
        }),

    ]
};

const logger = winston.createLogger(logConfiguration);

function log_info(message){
    logger.info({
            message: message,        
            level: 'info'
        });
}

function log_error(message){

    logger.error(message);
    /*
    logger.error({
            message: message,        
            level: 'error'
        });
        */
}

function log_warn(message){
    logger.warn(message);
}

module.exports = {log_info,log_error,log_warn};
/*
logger.log({
    // Message to be logged
        message: 'Hello, Winston! 1',
    
    // Level of the message logging
        level: 'info'
    });
    // Log a message
    logger.info('Hello, Winston! 2');

    logger.log({level:'error', message:'this is error 01'});
    */