import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    console.log(createPostDto);
    return await this.postRepository.save(createPostDto);
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findPostByUserId(userId: number): Promise<Post[]> {
    console.log(userId);
    return await this.postRepository.find({
      where: { userId: Equal(userId) },
      relations: ['userId'],
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) throw new Error('POST_NOT_FOUND');

    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async removePost(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) throw new Error('POST_NOT_FOUND');

    await this.postRepository.remove(post);
    return `POST_ID:${id} POST_DELETED!`;
  }
}
