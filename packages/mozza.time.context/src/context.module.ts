import { Module } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";
import { ContextService } from "./context.service";

@Module({
  providers: [{ provide: AsyncLocalStorage, useValue: new AsyncLocalStorage() }, ContextService],
  exports: [ContextService],
})
export class MztContextModule {}
