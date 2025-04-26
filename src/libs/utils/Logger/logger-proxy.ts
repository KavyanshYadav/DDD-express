import { Logger } from "./logger.interface";

export class LoggerProxy implements Logger{
    private currentLogger:Logger;

    constructor(initialLogger:Logger){
        this.currentLogger = initialLogger;
    }
    setLogger(newLogger:Logger){
        this.currentLogger = newLogger;
    }
    log(message: string): void {
    this.currentLogger.log(message);
    }

    error(message: string): void {
        this.currentLogger.error(message);
    }

    warn(message: string): void {
        this.currentLogger.warn(message)
    }
}