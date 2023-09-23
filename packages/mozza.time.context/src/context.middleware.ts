import { Injectable, NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";

import { ContextService } from "./context.service";
import { MztTenantIdFactory } from "./types/tenant-id";

@Injectable()
export class MztContextMiddleware implements NestMiddleware {
  constructor(private readonly contextService: ContextService<{ tenantId: number }>) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const tenantId = req.get("x-tenant-id");
    MztTenantIdFactory.parse(Number(tenantId));

    this.contextService.use({ tenantId: Number(tenantId) });

    next();
  }
}
