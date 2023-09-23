import { Constructor, ICommandHandler, CommandBus as NestCommandBus } from "@nestjs/cqrs";

export type CommandExtractor<T> = T extends readonly unknown[]
  ? CommandExtractor<T[number]>
  : T extends Constructor<ICommandHandler<infer TCommand>>
  ? TCommand
  : never;

export class CommandBus<T extends readonly Constructor<ICommandHandler>[]> extends NestCommandBus<
  CommandExtractor<T>
> {}
