import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<Posts> {
    console.log(createPostDto);
    return await this.postRepository.save(createPostDto);
  }

  async findAllPost(): Promise<Posts[]> {
    return await this.postRepository.find({ relations: ['userId'] });
  }

  async findPostByUserId(userId: number): Promise<Posts[]> {
    console.log(userId);
    return await this.postRepository.find({
      where: { userId: Equal(userId) },
      relations: ['userId'],
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Posts> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) throw new Error('POST_NOT_FOUND');

    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async removePost(id: number): Promise<string> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) throw new Error('POST_NOT_FOUND');

    await this.postRepository.remove(post);
    return `POST_ID:${id} POST_DELETED!`;
  }
}
