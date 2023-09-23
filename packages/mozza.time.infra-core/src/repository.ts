import { AggregateRoot } from "@nestjs/cqrs";

export interface Repository<T extends AggregateRoot, TOut extends Promise<any>> {
  persist(aggregate: T): TOut;
}
