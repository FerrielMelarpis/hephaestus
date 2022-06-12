import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    // APIs
    BotModule,
  ],
})
export class ServerModule {}
