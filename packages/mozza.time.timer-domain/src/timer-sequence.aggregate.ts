import { AggregateRoot } from "@nestjs/cqrs";
import { randomUUID } from "crypto";
import { z } from "zod";

export class TimerSequence extends AggregateRoot {
  protected constructor(readonly id: TimerSequenceId) {
    super();
  }

  static async create(props: { durations: readonly number[]; name: string }): Promise<TimerSequence> {
    const { durations, id, name } = await z
      .object({
        durations: z.array(DurationFactory),
        id: TimerSequenceIdFactory,
        name: z.string().nonempty(),
      })
      .parseAsync({
        ...props,
        id: TimerSequenceIdFactory.create(),
      });

    const self = new TimerSequence(id);
    self.apply(new TimerSequenceCreated(id, name, durations));
    return self;
  }

  static async from(props: { id: string }) {
    const { id } = await z.object({ id: TimerSequenceIdFactory }).parseAsync(props);
    return new TimerSequence(id);
  }

  static idle(props: { id: string }) {
    return IdleTimerSequence.from(props);
  }

  static running(props: { id: string }) {
    return RunningTimerSequence.from(props);
  }

  static paused(props: { id: string }) {
    return PausedTimerSequence.from(props);
  }

  update(timers: readonly Duration[]) {
    this.apply(new TimerSequenceUpdated(this.id, timers));
  }
}

class IdleTimerSequence extends AggregateRoot {
  protected constructor(readonly id: TimerSequenceId) {
    super();
  }

  static async from(props: { id: string }) {
    const { id } = await z.object({ id: TimerSequenceIdFactory }).parseAsync(props);
    return new IdleTimerSequence(id);
  }

  start(instant: Date) {
    this.apply(new TimerSequenceStarted(this.id, instant));
  }
}

class RunningTimerSequence extends AggregateRoot {
  protected constructor(readonly id: TimerSequenceId) {
    super();
  }

  pause(instant: Date) {
    this.apply(new TimerSequencePaused(this.id, instant));
  }

  static async from(props: { id: string }) {
    const { id } = await z.object({ id: TimerSequenceIdFactory }).parseAsync(props);
    return new RunningTimerSequence(id);
  }
}

class PausedTimerSequence extends AggregateRoot {
  protected constructor(readonly id: TimerSequenceId) {
    super();
  }

  unpause(instant: Date) {
    this.apply(new TimerSequenceUnpaused(this.id, instant));
  }

  static async from(props: { id: string }) {
    const { id } = await z.object({ id: TimerSequenceIdFactory }).parseAsync(props);
    return new PausedTimerSequence(id);
  }
}

export class TimerSequenceCreated {
  constructor(
    readonly id: TimerSequenceId,
    readonly name: string,
    readonly durations: readonly Duration[],
  ) {}
}

export class TimerSequenceStarted {
  constructor(
    readonly id: TimerSequenceId,
    readonly instant: Date,
  ) {}
}

export class TimerSequencePaused {
  constructor(
    readonly id: TimerSequenceId,
    readonly instant: Date,
  ) {}
}

export class TimerSequenceUnpaused {
  constructor(
    readonly id: TimerSequenceId,
    readonly instant: Date,
  ) {}
}

export class TimerSequenceUpdated {
  constructor(
    readonly id: TimerSequenceId,
    readonly timers: readonly Duration[],
  ) {}
}

const DurationFactory = z.number().positive().max(3_600_000);
type Duration = z.infer<typeof DurationFactory>;

const TimerFactory = z.object({
  duration: z.number().positive().max(3_600_000),
});
type Timer = z.infer<typeof TimerFactory>;

const TimerSequenceIdFactory = Object.assign(z.string().uuid().brand("TimerSequenceId"), {
  create() {
    return randomUUID() as TimerSequenceId;
  },
});
export type TimerSequenceId = z.infer<typeof TimerSequenceIdFactory>;
