import EventEmitter from "events";
import { Appconfig } from "./config.interface";

class ConfigService extends EventEmitter{
    private config:Appconfig;

    constructor(initialConfig:Appconfig){
        super()
        this.config = initialConfig;
    }

    get<K extends keyof Appconfig>(key:K):Appconfig[K]{
        return this.config[key]
    }

    set<K extends keyof Appconfig> (key:K , value: Appconfig[K]):void {
        this.config[key] = value;
        this.emit("configChanged",key,value);
    }
}

export const configService = new ConfigService(
    {
        environment:"development",
        logger: "console",
    }
)
