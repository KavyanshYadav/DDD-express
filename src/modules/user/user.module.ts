import { Request, Response, Router } from "express";
import { DomainEventHandler } from "../../libs/ddd/base-classes/domain-event-handler";
import { InMemoryDomainEventDispatcher } from "../../libs/ddd/base-classes/in-memory-event-dispatcher";
import { CreateUserHttpController } from "./commands/create-user/create-user.http.controller";
import { CreateUserService } from "./commands/create-user/create-user.service";
import { InMemoryUserRepository } from "./database/user.inmemory.repository";
import { UserCreatedDomainEvent } from "./domain/events/user-created.domain-event";
import { UserRoutes } from "./user.routes";

class Createwall implements DomainEventHandler<UserCreatedDomainEvent>{
    async handle(event:UserCreatedDomainEvent):Promise<void>{
        await new Promise((res)=> setTimeout(res,2000))
        
        console.log("User created event dispatcher",event);
    }
}
export class UserModule{
    public readonly router:Router; 
    private readonly userEventDispatcher : InMemoryDomainEventDispatcher;
    private readonly userRepository: InMemoryUserRepository;

    constructor(){
        this.router = Router();

        this.userEventDispatcher = new InMemoryDomainEventDispatcher();
        this.userRepository = new InMemoryUserRepository();
        this.userEventDispatcher.register(UserCreatedDomainEvent, new Createwall() )

        //create-user
        const createUserservice = new CreateUserService(this.userRepository,this.userEventDispatcher);
        const createUserHttpController = new CreateUserHttpController(createUserservice);

        this.router.post(UserRoutes.createUser , (req:Request,res:Response)=> createUserHttpController.handle(req,res));
    }

}
