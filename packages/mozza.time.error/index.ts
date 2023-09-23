import { HttpStatus } from "@nestjs/common";

export class MztError extends Error {
  readonly name: string;
  readonly code: string | number | undefined;
  readonly httpStatusCode: HttpStatus | undefined;

  constructor(props: { name: string; message: string; code?: string | number; httpStatusCode?: HttpStatus }) {
    super(props.message);

    this.name = props.name;
    this.code = props.code;
    this.httpStatusCode = props.httpStatusCode;
  }

  toString() {
    return `[${this.name}]${this.code ? ` (${this.code})` : ""} - ${this.message}${
      this.httpStatusCode ? ` | ${this.httpStatusCode}` : ""
    }`;
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      status: this.httpStatusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
      message: this.message,
    };
  }
}

export function fail(
  name: string,
  message: string,
  props: { code?: string | number; httpStatusCode?: HttpStatus } = {},
): never {
  throw new MztError({ name, message, ...props });
}
