import { Request, Response, Router } from "express";
import { DomainEventHandler } from "../../libs/ddd/base-classes/domain-event-handler";
import { InMemoryDomainEventDispatcher } from "../../libs/ddd/base-classes/in-memory-event-dispatcher";
import { CreateUserHttpController } from "./commands/create-user/create-user.http.controller";
import { CreateUserService } from "./commands/create-user/create-user.service";
import { InMemoryUserRepository } from "./database/user.inmemory.repository";
import { UserCreatedDomainEvent } from "./domain/events/user-created.domain-event";
import { UserRoutes } from "./user.routes";
import { container, injectable } from "tsyringe";
import { Logger } from "pino";
import { Console } from "console";
import { ConsoleLogger } from "../../libs/utils/Logger/console-logger";
import { WinstonLogger } from "../../libs/utils/Logger/winston-logger";
import { MCommandBus } from "../..";
import { CreateUserCommand } from "./commands/create-user/create-user.command";

class Createwall implements DomainEventHandler<UserCreatedDomainEvent>{
    async handle(event:UserCreatedDomainEvent):Promise<void>{
        await new Promise((res)=> setTimeout(res,2000))
        
        console.log("User created event dispatcher",event);
    }
}
@injectable()
export class UserModule{
    public readonly router:Router; 
    private readonly userEventDispatcher : InMemoryDomainEventDispatcher;
    private readonly userRepository: InMemoryUserRepository;

    constructor(){
        this.router = Router();

        this.userEventDispatcher = new InMemoryDomainEventDispatcher();
        this.userRepository = new InMemoryUserRepository();
        this.userEventDispatcher.register(UserCreatedDomainEvent, new Createwall() )

        
        container.registerInstance(InMemoryUserRepository, this.userRepository);
        container.registerInstance(InMemoryDomainEventDispatcher, this.userEventDispatcher);
        container.register(CreateUserService, { useClass: CreateUserService });
        container.register(CreateUserHttpController, { useClass: CreateUserHttpController });
        
        MCommandBus.register(CreateUserCommand.name, container.resolve(CreateUserService))
        //create-user
      const createUserHttpController = container.resolve(CreateUserHttpController);

        this.router.post(UserRoutes.createUser , (req:Request,res:Response)=> createUserHttpController.handle(req,res));
    }

}
