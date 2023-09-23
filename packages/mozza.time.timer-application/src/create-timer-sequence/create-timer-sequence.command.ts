export class CreateTimerSequenceCommand {
  constructor(
    readonly name: string,
    readonly durations: readonly number[],
  ) {}
}
