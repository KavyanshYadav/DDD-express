import { DomainEvent } from "./domain-event.base";
import { EntityBase } from "./entity.base";
import { AggregateID } from "./types/aggregate-id.type";

export abstract class AggregateRoot<Props> extends EntityBase<Props> {
    private  _domainEvents: DomainEvent[] = [];

    get id():AggregateID {
        return this._id;
    }

    protected addEvent(domainEvent :DomainEvent): void {
        this._domainEvents.push(domainEvent);

    }

    public clearEvents() {
        this._domainEvents = [];
    }
   
  pullEvents(): DomainEvent[] {
    const events = [...this._domainEvents];
    console.log("polling events")
    this._domainEvents = [];
    return events;
  } 
}