import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../auth/entities/users.entity';
import { Request } from 'express';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;
  let postRepository: Repository<Posts>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Posts),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
    postRepository = module.get<Repository<Posts>>(getRepositoryToken(Posts));
  });
  const posts: Posts[] = [
    Object.assign(new Posts(), {
      id: 1,
      title: 'title1',
      content: 'content1',
      createdAt: new Date('2023-06-09T06:31:18.140Z'),
      updatedAt: new Date('2023-06-09T06:31:18.140Z'),
      userId: Object.assign(new User(), {
        id: 1,
        username: 'username1',
        email: 'email1@example.com',
        password: 'password1',
      }),
    }),
    Object.assign(new Posts(), {
      id: 2,
      title: 'title2',
      content: 'content2',
      createdAt: new Date('2023-06-09T06:32:28.240Z'),
      updatedAt: new Date('2023-06-09T06:32:28.240Z'),
      userId: Object.assign(new User(), {
        id: 2,
        username: 'username2',
        email: 'email2@example.com',
        password: 'password2',
      }),
    }),
    Object.assign(new Posts(), {
      id: 3,
      title: 'title3',
      content: 'content3',
      createdAt: new Date('2023-06-09T06:33:38.340Z'),
      updatedAt: new Date('2023-06-09T06:33:38.340Z'),
      userId: Object.assign(new User(), {
        id: 3,
        username: 'username3',
        email: 'email3@example.com',
        password: 'password3',
      }),
    }),
  ];

  describe('findPost', () => {
    it('should return an array of posts', async () => {
      jest.spyOn(service, 'findAllPost').mockResolvedValue(posts);

      const result = await controller.findAllPost();

      expect(result).toEqual(posts);
      expect(service.findAllPost).toHaveBeenCalled();
    });

    it('should return array of user posts', async () => {
      const userId = 1;
      const request: Request = { user: { id: userId } } as any;

      jest.spyOn(service, 'findPostByUserId').mockResolvedValue(posts);

      const result = await controller.findPostByUserId(request);

      expect(result).toBe(posts);
      expect(service.findPostByUserId).toHaveBeenCalledWith(userId);
    });
  });
});
