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
  createPost(@Req() req: Request, @Body() createPostDto: CreatePostDto): Promise<Posts> {
    const user: any = req.user;
    const userId = user.id;
    createPostDto.userId = userId;
    console.log(createPostDto.userId);
    return this.postService.createPost(createPostDto);
  }

  @Get()
  findAllPost(): Promise<Posts[]> {
    return this.postService.findAllPost();
  }

  @Get('user')
  @UseGuards(AuthGuard)
  findPostByUserId(@Req() req: Request): Promise<Posts[]> {
    const user: any = req.user;
    const userId = user.id;
    const result = this.postService.findPostByUserId(userId);
    return result;
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<Posts> {
    return this.postService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  removePost(@Param('id') id: string): Promise<string> {
    return this.postService.removePost(+id);
  }
}
