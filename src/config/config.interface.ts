export interface Appconfig{
    environment: "development" | "production" | "performance" | string

    logger: "winston" | "pino" | "console"
}