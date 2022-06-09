import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as request from 'supertest';
import { BotModule } from 'src/bot/bot.module';

describe('BotController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  const seedData = [
    { name: 'bot1', purpose: 'testing' },
    { name: 'bot2', purpose: 'testing' },
    { name: 'bot3', purpose: 'testing' },
    { name: 'bot4', purpose: 'nothing' },
    { name: 'bot5', purpose: 'nothing' },
  ];

  // seed the test database
  beforeAll(async () => {
    prisma = new PrismaClient();

    await prisma.bot.createMany({
      data: seedData,
    });
  });

  afterAll(async () => {
    await prisma.bot.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BotModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /bots', async () => {
    const response = await request(app.getHttpServer()).get('/bots');
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject(seedData);
  });
});
