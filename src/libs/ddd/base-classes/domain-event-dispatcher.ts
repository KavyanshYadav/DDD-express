import { DomainEventHandler } from "./domain-event-handler";
import { DomainEvent } from "./domain-event.base";

export interface DomainEventDispatcher {
    dispatch(event:DomainEvent) : Promise<void>;
    register<T extends DomainEvent>(
    eventClass: new (...args: any[]) => T,
    handler: DomainEventHandler<T>,
  ): void;
}

