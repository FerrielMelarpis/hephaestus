import { Injectable } from '@nestjs/common';
import { Bot, Prisma } from '@prisma/client';
import { PrismaService } from 'src/server/services/prisma.service';

type BotServiceFindManyParams = {
  skip: number;
  take: number;
  cursor: Prisma.BotWhereUniqueInput;
  where: Prisma.BotWhereInput;
  orderBy: Prisma.BotOrderByWithRelationInput;
};

@Injectable()
export class BotService {
  constructor(private prisma: PrismaService) {}

  async findUnique(where: Prisma.BotWhereUniqueInput): Promise<Bot | null> {
    return this.prisma.bot.findUnique({ where });
  }

  async findMany(params: Partial<BotServiceFindManyParams>): Promise<Bot[]> {
    return this.prisma.bot.findMany(params);
  }

  async createBot(data: Prisma.BotCreateInput): Promise<Bot> {
    return this.prisma.bot.create({ data });
  }

  async updateBot(params: {
    where: Prisma.BotWhereUniqueInput;
    data: Prisma.BotUpdateInput;
  }): Promise<Bot> {
    const { where, data } = params;
    return this.prisma.bot.update({
      data,
      where,
    });
  }

  async deleteBot(where: Prisma.BotWhereUniqueInput): Promise<Bot> {
    return this.prisma.bot.delete({ where });
  }
}
