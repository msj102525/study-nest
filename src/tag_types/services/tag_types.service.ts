import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagTypeDto } from '../dtos/create-tag_type.dto';
import { UpdateTagTypeDto } from '../dtos/update-tag_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagTypes } from '../entities/tag_type.entity';
import { Equal, FindOneOptions, Repository } from 'typeorm';
import { ApiResponse, statusMessage } from 'src/common/response/api.response';

@Injectable()
export class TagTypesService {
  constructor(@InjectRepository(TagTypes) private repository: Repository<TagTypes>) {}

  async isExistTagTypeById(option: FindOneOptions<TagTypes>): Promise<TagTypes> {
    const tagTypeFindById = await this.repository.findOne(option);

    console.log(tagTypeFindById);
    if (!tagTypeFindById) {
      const errorMessage = { message: 'TAG_TYPE_NOT_FOUND' };
      throw new HttpException(new ApiResponse(statusMessage.f, HttpStatus.BAD_REQUEST, errorMessage), HttpStatus.BAD_REQUEST);
    }

    return tagTypeFindById;
  }

  async isExistTagTypeByBody(createTagTypeDto: CreateTagTypeDto): Promise<TagTypes> {
    const { tagType, tagStateId } = createTagTypeDto;

    const tagTypeFind: TagTypes | undefined = await this.repository.findOne({
      relations: ['tagStateId'],
      where: {
        tagStateId: Equal(tagStateId),
        tagType: tagType,
      },
    });

    return tagTypeFind;
  }

  async createTagType(createTagTypeDto: CreateTagTypeDto): Promise<TagTypes> {
    const tagTypeFind = await this.isExistTagTypeByBody(createTagTypeDto);

    if (tagTypeFind) {
      const errorMessage = { message: 'TAG_TYPE_ALREADY_USED' };
      throw new HttpException(new ApiResponse(statusMessage.f, HttpStatus.BAD_REQUEST, errorMessage), HttpStatus.BAD_REQUEST);
    }

    await this.repository.save({
      tagType: createTagTypeDto.tagType,
      tagStateId: createTagTypeDto.tagStateId,
    });

    const tagTypeResult = await this.isExistTagTypeByBody(createTagTypeDto);

    return tagTypeResult;
  }

  async findAllTagTpyesByStatus(status: number): Promise<TagTypes[]> {
    console.log(status);
    const tagTypesArray = await this.repository.find({
      relations: ['tagStateId'],
      where: { tagStateId: Equal(status) },
    });

    if (tagTypesArray.length < 1) {
      const errorMessage = { message: 'TAG_TYPE_NOT_FOUND' };
      throw new HttpException(new ApiResponse(statusMessage.f, HttpStatus.BAD_REQUEST, errorMessage), HttpStatus.BAD_REQUEST);
    }

    return tagTypesArray;
  }

  async updateTagType(id: number, updateTagTypeDto: UpdateTagTypeDto): Promise<TagTypes> {
    const tagTypeFindById = await this.isExistTagTypeById({
      relations: ['tagStateId'],
      where: { id },
    });
    console.log(`update`, updateTagTypeDto);

    Object.assign(tagTypeFindById, updateTagTypeDto);
    return await this.repository.save(tagTypeFindById);
  }

  async removeTagType(id: number): Promise<string> {
    const tagTypeFindById = await this.isExistTagTypeById({ where: { id } });

    await this.repository.remove(tagTypeFindById);

    return `This action removes a tagTypeId: ${id}`;
  }
}
