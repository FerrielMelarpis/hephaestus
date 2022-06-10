import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
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
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('GET /bots', async () => {
    const response = await request(app.getHttpServer()).get('/bots');
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject(seedData);
  });

  it('GET /bots/?take=1&skip=1&searchString=testing&orderBy=asc', async () => {
    const response = await request(app.getHttpServer()).get(
      '/bots/?take=1&skip=1&searchString=testing&orderBy=asc',
    );
    expect(response.status).toEqual(200);
    // This test depends on the seedData, updating it would affect the results hence a possible need to update this assertion.
    expect(response.body).toMatchObject([
      {
        name: 'bot2',
        purpose: 'testing',
      },
    ]);
  });

  it('GET /bots/:id', async () => {
    const response = await request(app.getHttpServer()).get('/bots');
    const [firstBot] = response.body;
    const response2 = await request(app.getHttpServer()).get(
      `/bots/${firstBot.id}`,
    );
    expect(response2.status).toEqual(200);
    expect(response2.body).toMatchObject(firstBot);
  });

  it('POST /bots', async () => {
    const bot = { name: 'createBot', purpose: 'createBot' };
    const response = await request(app.getHttpServer()).post('/bots').send(bot);
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject(bot);

    // test invalid data as well
    const bot2 = { name: 'invalid-n@me', purpose: 'createBot' };
    const response2 = await request(app.getHttpServer())
      .post('/bots')
      .send(bot2);
    expect(response2.status).toEqual(400);
  });

  it('PATCH /bots/:id', async () => {
    const patchObj = { purpose: 'patching' };
    const bot = { name: 'origBot', purpose: 'origPurpose' };
    const response = await request(app.getHttpServer()).post('/bots').send(bot);
    const response2 = await request(app.getHttpServer())
      .patch(`/bots/${response.body.id}`)
      .send(patchObj);
    expect(response2.status).toEqual(200);
    expect(response2.body).toMatchObject({ ...bot, ...patchObj });
  });

  it('DELETE /bots/:id', async () => {
    const bot = { name: 'botToBeDeleted', purpose: 'botToBeDeleted' };
    const response = await request(app.getHttpServer()).post('/bots').send(bot);
    const response2 = await request(app.getHttpServer()).delete(
      `/bots/${response.body.id}`,
    );
    expect(response2.status).toEqual(200);
    expect(response2.body).toMatchObject(bot);
  });
});
