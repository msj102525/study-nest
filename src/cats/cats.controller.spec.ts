import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;
  let catRepository: Repository<Cat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
    catRepository = module.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  it('should be defined', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([]);

    const result = await controller.findAll();

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(result).toEqual([]);
  });
});
