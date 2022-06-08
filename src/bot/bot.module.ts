import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [BotController],
  providers: [PrismaService, BotService],
})
export class BotModule {}
