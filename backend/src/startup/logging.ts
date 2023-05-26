import winston, { transports } from 'winston';

export default function setupLogging() {
    // Log uncaught exceptions (thrown errors) and rejected promises
    // then exit the program (default winston behaviour).
    // If a promise or exception is not caught outside the routes
    // handled by express, it will still be logged due to this definitions.
    const consoleLogger = new transports.Console({handleExceptions: true, handleRejections: true})
    // winston should log to console.
    winston.add(consoleLogger)

}

