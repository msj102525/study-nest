import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../auth//security/auth.guard';
import { Posts } from './entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createPost(@Req() req: Request, @Body() createPostDto: CreatePostDto): Promise<Posts> {
    const user: any = req.user;
    const userId = user.id;
    createPostDto.userId = userId;
    // console.log(createPostDto);
    return await this.postService.createPost(createPostDto);
  }

  @Get()
  async findAllPost(): Promise<Posts[]> {
    return await this.postService.findAllPost();
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async findPostByUserId(@Req() req: Request): Promise<Posts[]> {
    const user: any = req.user;
    const userId = user.id;
    const result = await this.postService.findPostByUserId(userId);
    return result;
  }

  @Patch(':id')
  async updatePost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto): Promise<Posts> {
    return await this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  async removePost(@Param('id') id: number): Promise<string> {
    return await this.postService.removePost(id);
  }
}
