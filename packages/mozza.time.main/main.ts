import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MztTimerModule } from "mozza.time.timer-controller";

@Module({ imports: [MztTimerModule] })
class AppModule {}

export async function main() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.NODE_PORT ?? 3000);
}

main().catch(console.error);
