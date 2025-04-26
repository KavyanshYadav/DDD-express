
import { DomainEvent } from './domain-event.base';

export interface DomainEventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}