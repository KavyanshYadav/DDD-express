import { DomainEventDispatcher } from "../../../../libs/ddd/base-classes/domain-event-dispatcher";
import { InMemoryDomainEventDispatcher } from "../../../../libs/ddd/base-classes/in-memory-event-dispatcher";
import { Logger } from "../../../../libs/utils/Logger/logger.interface";
import { InMemoryUserRepository } from "../../database/user.inmemory.repository";
import { UserRepository } from "../../database/user.repository";
import { UserEntity } from "../../domain/user.entity";
import { Address } from "../../domain/value-objects/address.value-object";
import { inject, injectable } from "tsyringe";
interface CreateUserCommand {
  email: string;
  address: {
    street: string;
    postalCode: string;
    country: string;
  };
}
@injectable()
export class CreateUserService {
    constructor(
        @inject("Logger") private logger: Logger,
        @inject(InMemoryUserRepository)private readonly userRepositor:UserRepository, 
        @inject(InMemoryDomainEventDispatcher)private readonly eventDispatcher : DomainEventDispatcher,
    ){}

    async execute(command:CreateUserCommand) : Promise<UserEntity>{
        const user = UserEntity.create({
            email:command.email,
            address: new Address({
                street: command.address.street,
                postalCode: command.address.postalCode,
                country:command.address.country,
            })
        })
        this.logger.error("Name")
        await this.userRepositor.save(user)
        
        const events = user.pullEvents();
        for(const event of events){
            console.log(event)
            await this.eventDispatcher.dispatch(event);
        }
        return user;
    }
}