// src/shared/logger/pino-logger.ts
import { Logger } from "./logger.interface";
import pino from "pino";

const pinoLogger = pino();

export class PinoLogger implements Logger {
  log(message: string): void {
    pinoLogger.info(message);
  }
  error(message: string): void {
    pinoLogger.error(message);
  }
  warn(message: string): void {
    pinoLogger.warn(message);
  }
}
