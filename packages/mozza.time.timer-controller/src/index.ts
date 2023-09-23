import { Body, Controller, MiddlewareConsumer, Module, NestModule, Post } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { MztContextMiddleware, MztContextModule } from "mozza.time.context";
import { CreateTimerSequenceCommand } from "mozza.time.timer-application";
import { MztTimerApplicationModule, MztTimerCommandBus } from "mozza.time.timer-application";

import { CreateTimerSequence } from "./dtos";

@Controller("timers")
class MztTimerController {
  constructor(private readonly commandBus: MztTimerCommandBus) {}

  @Post()
  async createTimerSequence(
    @Body() request: CreateTimerSequence.Request,
  ): Promise<CreateTimerSequence.Response> {
    const id = await this.commandBus.execute(new CreateTimerSequenceCommand(request.name, request.durations));
    return { id };
  }
}

@Module({
  imports: [CqrsModule, MztContextModule, MztTimerApplicationModule],
  controllers: [MztTimerController],
})
export class MztTimerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MztContextMiddleware).forRoutes(MztTimerController);
  }
}
