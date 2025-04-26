
import { DomainEventDispatcher } from './domain-event-dispatcher';
import { DomainEventHandler } from './domain-event-handler';
import { DomainEvent } from './domain-event.base';


export class InMemoryDomainEventDispatcher implements DomainEventDispatcher {
  private readonly handlersMap = new Map<string, DomainEventHandler<DomainEvent>[]>();

  async dispatch(event: DomainEvent): Promise<void> {
    const eventName = event.constructor.name;
    const handlers = this.handlersMap.get(eventName) || [];

    for (const handler of handlers) {
      await handler.handle(event);
    }
  }

  register<T extends DomainEvent>(
    eventClass: new (...args: any[]) => T,
    handler: DomainEventHandler<T>,
  ): void {
    const eventName = eventClass.name;
    const handlers = this.handlersMap.get(eventName) || [];
    handlers.push(handler as DomainEventHandler<DomainEvent>);
    this.handlersMap.set(eventName, handlers);
  }
}