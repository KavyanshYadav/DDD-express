// src/shared/logger/winston-logger.ts
import { Logger } from "./logger.interface";
import winston from "winston";

const winstonLogger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

export class WinstonLogger implements Logger {
  log(message: string): void {
    winstonLogger.info(message);
  }
  error(message: string): void {
    winstonLogger.error(message);
  }
  warn(message: string): void {
    winstonLogger.warn(message);
  }
}
