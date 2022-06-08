import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BotService } from './bot.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  create(@Body() createBotDto: CreateBotDto) {
    return this.botService.create(createBotDto);
  }

  @Get()
  findAll() {
    return this.botService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.botService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBotDto: UpdateBotDto,
  ) {
    return this.botService.update(id, updateBotDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.botService.remove(id);
  }
}
