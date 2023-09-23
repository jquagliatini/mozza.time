import { Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";
import { fail } from "mozza.time.error";

@Injectable()
export class ContextService<T> {
  constructor(private readonly als: AsyncLocalStorage<T>) {}

  getOptional<K extends keyof T>(key: K): T[K] | undefined {
    return this.als.getStore()?.[key];
  }

  get<K extends Exclude<keyof T, symbol>>(key: K): T[K] {
    const value = this.getOptional(key);
    if (value === undefined) {
      fail(`MztMissingContextKey`, `Missing ${key} from context`);
    }

    return value;
  }

  use(state: T) {
    this.als.enterWith(state);
  }
}
