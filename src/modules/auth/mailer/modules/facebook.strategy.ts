import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENTID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL_FACEBOOK,
      profileFields: ['id', 'displayName', 'email'], // Include 'email' field here
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    // Here you can perform user validation and retrieve or create user in your database
  
    const user = {
      email: "facebook@gmail.com",
      fullName: profile.displayName,
      lastName:  profile.displayName,
 
    }
    
    return done(null, profile);
  }
}
