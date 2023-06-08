import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    return await this.catRepository.save(createCatDto);
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.catRepository.findOne({ where: { id } });
    if (!cat) throw new Error('CAT_NOT_FOUND');
    Object.assign(cat, updateCatDto);
    return this.catRepository.save(cat);
  }

  async remove(id: number) {
    try {
      const cat = await this.catRepository.findOne({ where: { id } });
      if (!cat) {
        throw new Error('CAT_NOT_FOUND');
      }
      await this.catRepository.remove(cat);
      return `${cat.name} Cat_DELETED!`;
    } catch (err) {
      console.log(err);
    }
  }
}
