import { randomUUID } from "crypto";
import { AggregateRoot } from "../../../libs/ddd/base-classes/aggregate-root.base";
import { CreateUserProps, UserProps, UserRoles } from "./user.types";
import { UserCreatedDomainEvent } from "./events/user-created.domain-event";
import { AggregateID } from "../../../libs/ddd/base-classes/types/aggregate-id.type";

export class UserEntity extends AggregateRoot<UserProps>{
    protected  readonly _id : AggregateID;

    static create(createProps: CreateUserProps) :UserEntity{
        const id = randomUUID()
        const props:UserProps = {
            ...createProps,
            role:UserRoles.guest
        }
        const user = new UserEntity({id,props})

        user.addEvent(
            new UserCreatedDomainEvent(
                props.email,
                props.address.country,
                props.address.street,
                props.address.postalCode,
                id,
            )
        );
        
        return user;

    }

    constructor({id,props}: {id:AggregateID; props:UserProps})
    {
        super({id,props});
        this._id = id;
    }
}