import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) { // Add context argument
    return super.canActivate(context); // Pass context argument to super.canActivate()
  }

  handleRequest(err:any, user:any, info:any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
