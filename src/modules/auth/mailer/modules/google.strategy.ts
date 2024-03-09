// google.strategy.ts

import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ModulesAuthService } from '../../modules/auth.service';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: ModulesAuthService) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['profile', 'email'],
      passReqToCallback: true,
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      fullName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };
 
    const validateGoogleUser = await this.authService.RegisterCreateUser(user);
    
    const newValidateUser = {
      email: emails[0].value,
      fullName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      validateGoogleUser,
    };
    request.session.user = newValidateUser;

   
    done(null, newValidateUser);
  }
}
