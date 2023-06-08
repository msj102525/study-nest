import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepositroy: Repository<User>,
  ) {}

  async findByFiedls(option: FindOneOptions<UserDto>): Promise<UserDto | undefined> {
    return await this.userRepositroy.findOne(option);
  }

  async save(userDto: UserDto): Promise<UserDto | undefined> {
    await this.transfromPassword(userDto);
    console.log(userDto);
    return await this.userRepositroy.save(userDto);
  }

  async transfromPassword(user: UserDto): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }
}
