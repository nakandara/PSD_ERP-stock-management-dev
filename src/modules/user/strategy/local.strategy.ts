import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ModulesAuthService } from '../../auth/modules/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: ModulesAuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
    email: string,
  ): Promise<any> {
    const user = await this.authService.validateUser(username, password, email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
