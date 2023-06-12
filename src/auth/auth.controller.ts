import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from './security/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerAccount(@Req() req: Request, @Body() userDto: UserDto): Promise<UserDto> {
    return await this.authService.registerUser(userDto);
  }

  @Post('/login')
  async login(@Body() userDto: UserDto, @Res() res: Response): Promise<any> {
    const user: { accessToken: string; user: {} } = await this.authService.validateUser(userDto);
    // console.log(user);
    res.setHeader('Authorization', user.accessToken);
    return res.json(user);
  }

  @Get('/authentcate')
  @UseGuards(AuthGuard)
  isAuthenticated(@Req() req: Request): Promise<any> {
    const user: any = req.user;
    // console.log(user.id);
    return user;
  }
}
