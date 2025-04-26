import { DomainEventDispatcher } from "../../../../libs/ddd/base-classes/domain-event-dispatcher";
import { UserRepository } from "../../database/user.repository";
import { UserEntity } from "../../domain/user.entity";
import { Address } from "../../domain/value-objects/address.value-object";

interface CreateUserCommand {
  email: string;
  address: {
    street: string;
    postalCode: string;
    country: string;
  };
}
export class CreateUserService {
    constructor(private readonly userRepositor:UserRepository, private readonly eventDispatcher : DomainEventDispatcher){}

    async execute(command:CreateUserCommand) : Promise<UserEntity>{
        const user = UserEntity.create({
            email:command.email,
            address: new Address({
                street: command.address.street,
                postalCode: command.address.postalCode,
                country:command.address.country,
            })
        })
        console.log(user)
        await this.userRepositor.save(user)
        
        const events = user.pullEvents();
        for(const event of events){
            console.log(event)
            await this.eventDispatcher.dispatch(event);
        }
        return user;
    }
}