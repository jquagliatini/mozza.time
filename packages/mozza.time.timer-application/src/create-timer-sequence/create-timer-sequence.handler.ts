import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";

import { TimerSequenceId, TimerSequence } from "mozza.time.timer-domain";
import { TimerSequenceRepository } from "mozza.time.timer-infrastructure";

import { CreateTimerSequenceCommand } from "./create-timer-sequence.command";

@CommandHandler(CreateTimerSequenceCommand)
export class CreateTimerSequenceCommandHandler implements ICommandHandler<CreateTimerSequenceCommand> {
  constructor(private readonly timerSequenceRepository: TimerSequenceRepository) {}

  async execute(command: CreateTimerSequenceCommand): Promise<TimerSequenceId> {
    const sequence = await TimerSequence.create(command);
    await this.timerSequenceRepository.persist(sequence);

    return sequence.id;
  }
}
