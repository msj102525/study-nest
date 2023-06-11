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
    jest.spyOn(service, 'findOne').mockResolvedValue({
      id: 1,
      name: '1번고양이',
      age: 1,
      breed: '1종',
    });

    const resultFindAll = await controller.findAll();

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(resultFindAll).toEqual([]);
  });
});
