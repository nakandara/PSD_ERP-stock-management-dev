import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendForgotPasswordEmail(email: string, otp: string) {
    const html = await this.renderForgotPasswordTemplate({ otp });
    
    await this.mailerService.sendMail({
      to: email,
      subject: 'Forgot Password',
      html,
    });
  }

  private async renderForgotPasswordTemplate(data: Record<string, any>): Promise<string> {
    const template = handlebars.compile('<p>Your OTP is: {{ otp }}</p>');
    return template(data);
  }


    async sendFVerifyEmail(email: string, otp: string) {
    const html = await this.renderVerifyEmailTemplate({ otp });
    
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify Email',
      html,
    });
  }

  private async renderVerifyEmailTemplate(data: Record<string, any>): Promise<string> {
    const template = handlebars.compile('<p>Your OTP is: {{ otp }}</p>');
    return template(data);
  }
}
