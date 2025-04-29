import { Command } from "./ddd/base-classes/command-base";

export interface CommandHandler<T extends Command,R>{
   execute(command:T)  : Promise<R>
}

export class CommandBus {
    private handler = new Map<string ,CommandHandler<any,any>>();

    register<T extends Command,R>(commandName:string,commandHandler:CommandHandler<T,R>){
        this.handler.set(commandName,commandHandler);
    }

    async execute<T extends Command , R>(command:T):Promise<R>{
        const handler = this.handler.get(command.constructor.name);
        console.log("📜executing command",command)
        if(!handler){
            throw new Error("Handler not found of commandName:"+command.constructor.name);
        }else{
            return await handler.execute(command)
        }
    }
}