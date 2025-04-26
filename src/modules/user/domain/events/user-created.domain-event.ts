import { DomainEvent } from "../../../../libs/ddd/base-classes/domain-event.base";

export class UserCreatedDomainEvent extends DomainEvent {
    constructor(
        public readonly email : string,
        public readonly country: string,
        public readonly street: string,
        public readonly postalCode: string,
        aggregateId: string,
    )
    {
        super(aggregateId);
    }
}