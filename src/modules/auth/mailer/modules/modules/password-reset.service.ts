// // password-reset.service.ts
// import { Injectable } from '@nestjs/common';
// import { ModulesAuthService } from 'src/modules/auth/modules/auth.service';
// import { UserService } from 'src/modules/user/modules/user.service';

// @Injectable()
// export class PasswordResetService {
   
//   private readonly otpMap: Map<string, string> = new Map(); // Map to store email-OTP pairs
//  constructor(private authService: ModulesAuthService) {}

//   generateResetToken(email: string): string {
//     const resetToken = this.generateRandomToken();
//     this.otpMap.set(email, resetToken);
//     console.log(resetToken);
    
//     return resetToken;
//   }

//   verifyResetToken(email: string, token: string): boolean {
//     const storedToken = this.otpMap.get(email);
//     return storedToken === token;
//   }

//   async resetPassword(email: string, newPassword: string): Promise<void> {
//     console.log(email,'rrrrrrrrrrrrr');
//     const user = await this.userService.findByEmail(email);
  
    

//     if (user) {
//         // Update the user's password
//         user.password = newPassword;
  
//         // Save the updated user to the database
//        // await this.userService.resetPassword(user);
  
//         // Remove the used reset token from the map
//         this.otpMap.delete(email);
//       } else {
//         // Handle the case where the user is not found
//         throw new Error('User not found');
//       }
//   }

//   private generateRandomToken(): string {
//     // Generate a random token as your reset token
//     return Math.random().toString(36).substr(2);
//   }
// }


import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/modules/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetService {

    private readonly otpMap: Map<string, string> = new Map();
    private readonly otpLength: number = 6; // Length of the OTP

    constructor(
        private readonly userService: UserService // Injecting UserService
    ) {}

    generateResetToken(email: string): string {
        const resetToken = this.generateRandomOTP();
        this.otpMap.set(email, resetToken);
        console.log(resetToken);
        return resetToken;
    }

    verifyResetToken(email: string, token: string): boolean {
        const storedToken = this.otpMap.get(email);
        return storedToken === token;
    }

    async resetPassword(email: string, newPassword: string): Promise<void> {
     
      const user = await this.userService.findByEmail(email);
  
      console.log(user);
  
      if (!newPassword) {
          throw new Error('New password is required');
      }
  
      if (user) {
          // Update the user's password
          // Hash the newPassword using bcrypt
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          user.password = hashedPassword;
  
          // Save the updated user to the database
         await this.userService.updateUser(user);
  
          // Remove the used reset token from the  map
          this.otpMap.delete(email);
      } else {
          // Handle the case where the user is not found
          throw new Error('User not found');
      }
  }
  

    private generateRandomOTP(): string {
        // Generate a random numeric OTP
        const digits = '0123456789';
        let otp = '';
        for (let i = 0; i < this.otpLength; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }
}
