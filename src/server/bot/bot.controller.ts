import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { BotService } from './bot.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('api/bots')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBotDto: CreateBotDto) {
    try {
      return await this.botService.createBot(createBotDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            `${error.meta?.target} must be unique.`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findMany(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('searchString') searchString?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ) {
    const where = searchString
      ? {
          OR: [
            { name: { contains: searchString } },
            { purpose: { contains: searchString } },
          ],
        }
      : {};

    return this.botService.findMany({
      where,
      take: take != null ? Number(take) : undefined,
      skip: skip != null ? Number(skip) : undefined,
      orderBy: {
        id: orderBy || 'asc',
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const bot = await this.botService.findUnique({ id });

    if (bot === null) {
      throw new HttpException('Bot not found', HttpStatus.NOT_FOUND);
    }

    return bot;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBotDto: UpdateBotDto,
  ) {
    return this.botService.updateBot({
      where: { id },
      data: updateBotDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.botService.deleteBot({ id });
  }
}
