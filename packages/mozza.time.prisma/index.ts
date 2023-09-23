import { Injectable, Module, OnApplicationShutdown } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnApplicationShutdown {
  async onApplicationShutdown() {
    await this.$disconnect();
  }
}

@Module({ providers: [PrismaService], exports: [PrismaService] })
export class PrismaModule {}

export * from "./prisma-repository";
