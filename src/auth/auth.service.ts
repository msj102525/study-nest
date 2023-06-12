import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User, Payload } from './entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async registerUser(newUser: UserDto): Promise<UserDto> {
    // console.log(newUser.email);
    let userFind: UserDto = await this.userService.findByFiedls({
      where: { email: newUser.email },
    });
    if (userFind) {
      throw new HttpException('Username aleady used!', HttpStatus.BAD_REQUEST);
    }
    return await this.userService.save(newUser);
  }

  async validateUser(userDto: UserDto): Promise<{ accessToken: string; user: {} } | undefined> {
    // console.log(userDto);
    let userFind: User = await this.userService.findByFiedls({
      where: { email: userDto.email },
    });
    const validatePassword = await bcrypt.compare(userDto.password, userFind.password);

    if (!userFind || !validatePassword) {
      throw new UnauthorizedException();
    }
    const payload: Payload = { id: userFind.id, username: userFind.username };
    const user = { user: userFind, message: '성공!' };

    return {
      user: user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async tokenValidateUser(payload: Payload): Promise<UserDto | undefined> {
    return await this.userService.findByFiedls({
      where: { id: payload.id },
    });
  }
}
