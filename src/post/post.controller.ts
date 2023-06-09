import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/security/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    const user: any = req.user;
    const userId = user.id;
    createPostDto.userId = userId;
    console.log(createPostDto.userId);
    return this.postService.createPost(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get('user')
  @UseGuards(AuthGuard)
  findOne(@Req() req: Request) {
    const user: any = req.user;
    const userId = user.id;
    return this.postService.findPostByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
