import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Bot } from './entities/bot.entity';

@Injectable()
export class BotService {
  create(createBotDto: CreateBotDto) {
    return this.botsRepository.save(createBotDto);
  }

  findAll(): Promise<Bot[]> {
    return this.botsRepository.find();
  }

  findOne(id: number): Promise<Bot> {
    return this.botsRepository.findOneBy({ id });
  }

  update(id: number, updateBotDto: UpdateBotDto) {
    return this.botsRepository.update(id, updateBotDto);
  }

  async remove(id: number) {
    await this.botsRepository.delete(id);
  }
}
