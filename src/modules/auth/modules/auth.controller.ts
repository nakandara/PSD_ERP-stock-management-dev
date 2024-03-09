import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  Req,
  Res,
  Redirect,
} from '@nestjs/common';
import { ModulesAuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class ModulesAuthController {
  constructor(private authService: ModulesAuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  // Callback route after successful Google authentication
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    const token = req.user.accessToken;
    res.redirect(`http://localhost:3000/ERP/dashboard`);
  }

  @Get('success')
  getProfile(@Req() req) {
    const user = req.session.user;
    return user ? user : 'Not logged in';
  }
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<void> {
    // Facebook strategy will handle authentication
  }
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookCallback(@Req() req) {
    return req.user;
  }

  @Post('login')
  async login(@Body() body): Promise<any> {
    const { fullName, password, email } = body;

    return this.authService.login(fullName, password, email);
  }
}
