import { AggregateRoot, EventPublisher } from "@nestjs/cqrs";
import { Type } from "@nestjs/common";
import { PrismaPromise } from "@prisma/client/runtime/library";
import isNil from "lodash/isNil";

import { Repository } from "mozza.time.infra-core";
import { PrismaService } from "./index";

export abstract class PrismaRepository<T extends AggregateRoot> implements Repository<T, Promise<void>> {
  private readonly persistors = new Map<Type, Persistor>();

  protected constructor(
    protected readonly prisma: PrismaService,
    private readonly eventPublisher: EventPublisher,
  ) {}

  /** @final */
  protected setPersistor<E>(event: Type<E>, persistor: Persistor<E>): this {
    this.persistors.set(event, persistor.bind(this) as Persistor);

    return this;
  }

  /** @final */
  async persist(aggregate: T): Promise<void> {
    await this.prisma.$transaction(
      aggregate
        .getUncommittedEvents()
        .map(event => {
          if (this.persistors.has(event.constructor as Type)) {
            return (this.persistors.get(event.constructor as Type) as Persistor<typeof event>)(event);
          }

          return undefined;
        })
        .filter((x): x is PrismaPromise<void> => !isNil(x)),
    );

    this.eventPublisher.mergeObjectContext(aggregate).commit();
  }
}

type Persistor<E = Type, TOut extends PrismaPromise<any> = PrismaPromise<any>> = (event: E) => TOut;
