import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/services/prisma.service';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';

describe('BotController', () => {
  let controller: BotController;
  let botService: BotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotController],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            bot: {
              createBot: jest.fn(),
              updateBot: jest.fn(),
              deleteBot: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: BotService,
          useValue: {
            createBot: jest.fn(),
            updateBot: jest.fn(),
            deleteBot: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BotController>(BotController);
    botService = module.get<BotService>(BotService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createBot service', async () => {
    const createBot = jest.spyOn(botService, 'createBot');
    const input = { name: 'abc123', purpose: 'testing' };
    await controller.create(input);
    expect(createBot).toHaveBeenCalledWith(input);
  });

  it('should call updateBot service', async () => {
    const updateBot = jest.spyOn(botService, 'updateBot');
    const input = { name: 'abc123', purpose: 'testing' };
    await controller.update(1, input);
    expect(updateBot).toHaveBeenCalledWith({
      data: input,
      where: { id: 1 },
    });
  });

  it('should call findUnique service', async () => {
    const findUnique = jest.spyOn(botService, 'findUnique');
    await controller.findById(1);
    expect(findUnique).toHaveBeenCalledWith({ id: 1 });
  });

  it('should call findMany service', async () => {
    const findMany = jest.spyOn(botService, 'findMany');
    await controller.findMany(10, 0, 'searchString', 'asc');
    expect(findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { name: { contains: 'searchString' } },
          { purpose: { contains: 'searchString' } },
        ],
      },
      take: 10,
      skip: 0,
      orderBy: {
        id: 'asc',
      },
    });
  });

  it('should call deleteBot service', async () => {
    const deleteBot = jest.spyOn(botService, 'deleteBot');
    await controller.remove(1);
    expect(deleteBot).toHaveBeenCalledWith({ id: 1 });
  });
});
