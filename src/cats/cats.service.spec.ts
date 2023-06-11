import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

describe('CatsService', () => {
  let service: CatsService;
  let catRepository: Repository<Cat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    catRepository = module.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  it('should be defined', () => {
    const cats = [
      {
        id: 1,
        name: '1번고양이',
        age: 1,
        breed: '1종',
      },
      {
        id: 2,
        name: '2번고양이',
        age: 2,
        breed: '2종',
      },
      {
        id: 3,
        name: '3번고양이',
        age: 3,
        breed: '3종',
      },
    ];

    const cat = {
      id: 1,
      name: '1번고양이',
      age: 1,
      breed: '1종',
    };

    jest.spyOn(service, 'findAll').mockResolvedValue(cats);
    jest.spyOn(service, 'findOne').mockResolvedValue(cat);

    expect(service).toBeDefined();
  });
});
