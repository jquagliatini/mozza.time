import { z } from "zod";

export type MstTenantId = z.infer<typeof MztTenantIdFactory>;
export const MztTenantIdFactory = z.number().int().positive().min(1).brand("MztTenantId");
