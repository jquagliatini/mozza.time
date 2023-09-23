import { ArrayNotEmpty, IsInt, IsString } from "class-validator";

export namespace CreateTimerSequence {
  export class Request {
    @IsString()
    name!: string;

    @ArrayNotEmpty()
    @IsInt({ each: true })
    durations!: number[];
  }

  export class Response {
    id!: string;
  }
}
