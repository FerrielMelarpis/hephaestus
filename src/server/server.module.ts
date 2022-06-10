import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, '/../', `.env.${process.env.NODE_ENV}`),
    }),
    // APIs
    BotModule,
  ],
})
export class ServerModule {}
