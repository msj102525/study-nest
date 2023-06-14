import { Test, TestingModule } from '@nestjs/testing';
import { TagTypesController } from './tag_types.controller';
import { TagTypesService } from './tag_types.service';

describe('TagTypesController', () => {
  let controller: TagTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagTypesController],
      providers: [TagTypesService],
    }).compile();

    controller = module.get<TagTypesController>(TagTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
