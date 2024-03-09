import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import * as crypto from 'crypto'; // Import the crypto module
import { PasswordResetService } from './password-reset.service';

@Controller('pst')
export class ForgotPasswordController {
  constructor(private readonly mailService: MailService,
    private readonly passwordResetService: PasswordResetService,) {}

  @Post('forgot-password')
  async sendForgotPasswordEmail(@Body() body: { email: string }) {
    // Generate a random 6-digit OTP
    const otp = this.passwordResetService.generateResetToken(body.email);


    
    await this.mailService.sendForgotPasswordEmail(body.email, otp);

    return { message: 'Email sent successfully' };
  }


  @Post('reset-password')
  async resetPassword(@Body() body: { email: string, otp: string, newPassword: string }) {
    
    
    const { email, otp, newPassword } = body;

    // Verify the OTP
    const isOTPValid = this.passwordResetService.verifyResetToken(email, otp);

    if (!isOTPValid) { 
      return { message: 'Invalid OTP' };
    }

    // Reset the password
    this.passwordResetService.resetPassword(email, newPassword);

    return { message: 'Password reset successfully' };
  }
  
}
