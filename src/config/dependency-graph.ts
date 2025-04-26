import { container } from "tsyringe";
import { ConsoleLogger } from "../libs/utils/Logger/console-logger";
import { WinstonLogger } from "../libs/utils/Logger/winston-logger";
import { PinoLogger } from "../libs/utils/Logger/pino-logger";
import { configService } from "./config";
import { config } from "process";
import { LoggerProxy } from "../libs/utils/Logger/logger-proxy";
import { Logger } from "../libs/utils/Logger/logger.interface";


function bindLogger(type:string,loggerProxy:LoggerProxy) {
    console.log('changing logger')
    if (type === "console") {
    loggerProxy.setLogger(new ConsoleLogger())
  } else if (type === "winston") {
    loggerProxy.setLogger(new WinstonLogger())
  } else if (type === "pino") {
    loggerProxy.setLogger(new PinoLogger())
} else {
    throw new Error(`Unknown logger type: ${type}`);
  }
}



export async function bootstrapDependencies() {
    const loggerProxy = new LoggerProxy(new ConsoleLogger());
    container.registerInstance<Logger>("Logger",loggerProxy)
    bindLogger(configService.get("logger"),loggerProxy)

    configService.on("configChanged", (key,value)=>{
        if(key==='logger'){
            bindLogger(value,loggerProxy);
        }
    })
}

