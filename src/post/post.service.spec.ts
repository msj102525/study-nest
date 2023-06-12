import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../auth/entities/users.entity';

describe('PostService', () => {
  let service: PostService;
  let postRepository: Repository<Posts>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Posts),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get<Repository<Posts>>(getRepositoryToken(Posts));
  });

  it('should be defined', async () => {
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

    const post: Posts = Object.assign(new Posts(), {
      id: 1,
      title: '수정수정수정',
      content: '이 기상과 이 맘으로 충성을 다 하여',
      createdAt: new Date('2023-06-09T06:31:18.140Z'),
      updatedAt: new Date('2023-06-11T08:33:18.000Z'),
      userId: Object.assign(new User(), {
        id: 1,
        username: 'username1',
        email: 'email1@example.com',
        password: 'password1',
      }),
    });

    jest.spyOn(service, 'findAllPost').mockResolvedValue(posts);
    jest.spyOn(service, 'findPostByUserId').mockResolvedValue(posts);
    jest.spyOn(service, 'updatePost').mockResolvedValue(post);
    jest.spyOn(service, 'createPost').mockResolvedValue(post);
    jest.spyOn(service, 'removePost').mockResolvedValue('string');

    const result = await service.findAllPost();

    expect(result).toEqual(posts);
  });
});
