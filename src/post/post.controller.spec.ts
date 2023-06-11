import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;
  let postRepository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    jest.spyOn(service, 'findAllPost').mockResolvedValue([]);

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
