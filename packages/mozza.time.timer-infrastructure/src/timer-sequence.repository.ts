import { Injectable } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { PrismaRepository, PrismaService } from "mozza.time.prisma";
import { TimerSequence, TimerSequenceCreated } from "mozza.time.timer-domain";

@Injectable()
export class TimerSequenceRepository extends PrismaRepository<TimerSequence> {
  constructor(prisma: PrismaService, eventPublisher: EventPublisher) {
    super(prisma, eventPublisher);

    this.setPersistor(TimerSequenceCreated, this.persistTimerSequenceCreated);
  }

  private persistTimerSequenceCreated(event: TimerSequenceCreated) {
    return this.prisma.timerSequence.create({
      data: {
        id: String(event.id),
        name: event.name,
      },
    });
  }
}
