import { Test, TestingModule } from '@nestjs/testing';
import { TagTypesService } from './tag_types.service';

describe('TagTypesService', () => {
  let service: TagTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagTypesService],
    }).compile();

    service = module.get<TagTypesService>(TagTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
