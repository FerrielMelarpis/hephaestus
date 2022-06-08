import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities as botEntities } from './entities/entities';

@Module({
  imports: [TypeOrmModule.forFeature(botEntities)],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
