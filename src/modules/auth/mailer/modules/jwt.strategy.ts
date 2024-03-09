import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ModulesAuthService } from '../../modules/auth.service';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: ModulesAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<any> {
    return { userId: payload.sub, username: payload.username,email:payload.email };
  }
}
