import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { TagTypesService } from '../services/tag_types.service';
import { CreateTagTypeDto } from '../dtos/create-tag_type.dto';
import { UpdateTagTypeDto } from '../dtos/update-tag_type.dto';
import { ApiResponse, statusMessage } from 'src/common/response/api.response';

@Controller('tag-types')
export class TagTypesController {
  constructor(private readonly tagTypesService: TagTypesService) {}

  @Post()
  async createTagType(@Body() createTagTypeDto: CreateTagTypeDto) {
    const createTagType = await this.tagTypesService.createTagType(createTagTypeDto);
    return new ApiResponse(statusMessage.s, HttpStatus.CREATED, createTagType);
  }

  @Get(':status')
  async findAllTagTpyesByStatus(@Param('status') status: number) {
    const tagTypes = await this.tagTypesService.findAllTagTpyesByStatus(status);
    return new ApiResponse(statusMessage.s, HttpStatus.OK, tagTypes);
  }

  @Patch(':id')
  async updateTagType(@Param('id') id: number, @Body() updateTagTypeDto: UpdateTagTypeDto) {
    const updateTagType = await this.tagTypesService.updateTagType(id, updateTagTypeDto);
    return new ApiResponse(statusMessage.s, HttpStatus.OK, updateTagType);
  }

  @Delete(':id')
  async removeTagType(@Param('id') id: number) {
    const deleteTagType = await this.tagTypesService.removeTagType(id);
    return new ApiResponse(statusMessage.s, HttpStatus.NO_CONTENT, deleteTagType);
  }
}
