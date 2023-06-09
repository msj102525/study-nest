import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Equal, FindOneOptions, Repository } from 'typeorm';

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
      where: { user_id: Equal(userId) },
      relations: ['user_id'],
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
