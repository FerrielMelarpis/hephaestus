import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, '/../', `.env.${process.env.NODE_ENV}`),
    }),
    BotModule,
  ],
})
export class AppModule {}
