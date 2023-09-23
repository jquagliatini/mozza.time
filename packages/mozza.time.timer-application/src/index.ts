import { Module } from "@nestjs/common";
import { CommandBus as NestCommandBus } from "@nestjs/cqrs";

import { MztTimerInfrastructureModule } from "mozza.time.timer-infrastructure";
import { CommandBus } from "mozza.time.utils";

import { CreateTimerSequenceCommandHandler } from "./create-timer-sequence/create-timer-sequence.handler";

export class MztTimerCommandBus extends CommandBus<typeof COMMAND_HANDLERS> {}

const COMMAND_HANDLERS = [CreateTimerSequenceCommandHandler] as const;
const PROVIDERS = [{ provide: MztTimerCommandBus, useClass: NestCommandBus }];

@Module({
  imports: [MztTimerInfrastructureModule],
  providers: [...COMMAND_HANDLERS, ...PROVIDERS],
  exports: [MztTimerCommandBus],
})
export class MztTimerApplicationModule {}

export { CreateTimerSequenceCommand } from "./create-timer-sequence/create-timer-sequence.command";
