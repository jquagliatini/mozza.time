import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { PrismaModule } from "mozza.time.prisma";

import { TimerSequenceRepository } from "./timer-sequence.repository";

const REPOSITORIES: readonly Provider[] = [TimerSequenceRepository];

@Module({
  imports: [PrismaModule, CqrsModule],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
class MztTimerInfrastructureModule {}

export { MztTimerInfrastructureModule, TimerSequenceRepository };
