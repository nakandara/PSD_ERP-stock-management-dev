import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer/dist/mailer.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

import { PasswordResetService } from './password-reset.service';
import { UserModule } from 'src/modules/user/modules/user.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
       service:"gmail",
        auth: {
          user: 'nakandarapramod@gmail.com',
          pass: 'rksu sabo zjbc yahr',
        },
      },
      defaults: {
        from: '"No Reply" pramodnakandara@gmail.com',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserModule
  ],
  providers: [MailService, PasswordResetService],
  exports: [MailService, PasswordResetService],
})
export class Mail {}
