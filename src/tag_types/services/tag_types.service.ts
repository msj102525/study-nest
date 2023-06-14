import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagTypeDto } from '../dtos/create-tag_type.dto';
import { UpdateTagTypeDto } from '../dtos/update-tag_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagTypes } from '../entities/tag_type.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { ApiResponse, statusMessage } from 'src/common/response/api.response';

@Injectable()
export class TagTypesService {
  constructor(@InjectRepository(TagTypes) private repository: Repository<TagTypes>) {}

  async isExistTagType(option: FindOneOptions<TagTypes>): Promise<TagTypes> {
    const tagTypeFindById = await this.repository.findOne(option);

    console.log(tagTypeFindById);
    if (!tagTypeFindById) {
      const errorMessage = { message: 'TAG_TYPE_NOT_FOUND' };
      throw new HttpException(new ApiResponse(statusMessage.f, HttpStatus.BAD_REQUEST, errorMessage), HttpStatus.BAD_REQUEST);
    }

    return tagTypeFindById;
  }

  async createTagType(createTagTypeDto: CreateTagTypeDto): Promise<TagTypes> {
    const { tagType, tagStateId } = createTagTypeDto;

    const tagTypeFind: TagTypes | undefined = await this.repository.findOne({
      where: {
        tagStateId: tagStateId,
        tagType: tagType,
      },
    });

    if (tagTypeFind) {
      const errorMessage = { message: 'TAG_TYPE_ALREADY_USED' };
      throw new HttpException(new ApiResponse(statusMessage.f, HttpStatus.BAD_REQUEST, errorMessage), HttpStatus.BAD_REQUEST);
    }

    const tagTypeResult = this.repository.save({
      tagType: createTagTypeDto.tagType,
      tagStateId: createTagTypeDto.tagStateId,
    });

    return tagTypeResult;
  }

  async findAllTagTpyesByStatus(status: number): Promise<TagTypes[]> {
    console.log(status);
    const tagTypesArray = await this.repository.find({
      where: { tagStateId: status },
    });

    if (tagTypesArray.length < 1) {
      const errorMessage = { message: 'TAG_TYPE_NOT_FOUND' };
      throw new HttpException(new ApiResponse(statusMessage.f, HttpStatus.BAD_REQUEST, errorMessage), HttpStatus.BAD_REQUEST);
    }

    return tagTypesArray;
  }

  async updateTagType(id: number, updateTagTypeDto: UpdateTagTypeDto): Promise<TagTypes> {
    const tagTypeFindById = await this.isExistTagType({ where: { id } });

    Object.assign(tagTypeFindById, updateTagTypeDto);
    return await this.repository.save(tagTypeFindById);
  }

  async removeTagType(id: number): Promise<string> {
    const tagTypeFindById = await this.isExistTagType({ where: { id } });

    await this.repository.remove(tagTypeFindById);

    return `This action removes a tagTypeId: ${id}`;
  }
}
