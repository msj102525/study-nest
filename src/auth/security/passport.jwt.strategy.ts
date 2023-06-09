import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Payload } from '../entities/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'SECRET_KEY',
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    console.log(payload);
    const user = await this.authService.tokenValidateUser(payload);

    if (!user) {
      return done(new UnauthorizedException({ message: 'USER_NOT_FOUND' }));
    }

    return done(null, user);
  }
}
