import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesAuthController } from './modules/auth/modules/auth.controller';
import { UserController } from './modules/user/modules/user.controller';
import { AppController } from './app.controller';
import { LocalStrategy } from './modules/user/strategy/local.strategy';
import { AppService } from './app.service';

import { UserModule } from './modules/user/modules/user.module';
import { ModulesAuthModule } from './modules/auth/modules/auth.module';
import { ModulesHrModule } from './modules/hr/modules/hr.module';

import { User } from './modules/user/entities/modules/user.entity';
import { PersonalInfo } from './modules/user/entities/modules/personalInfo.entity';
import { Role } from './modules/user/entities/modules/role.entity';
import { Mail } from './modules/auth/mailer/modules/modules/mail.module';
import { ForgotPasswordController } from './modules/auth/mailer/modules/modules/forgot-password.controller';
import { ProfileImage } from './modules/user/entities/modules/profile-image.entity';
import { MulterModule } from '@nestjs/platform-express/multer';
import multer from 'multer';




@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'erp',
    entities: [User,PersonalInfo,Role,ProfileImage],
    synchronize: true
  }), UserModule,ModulesAuthModule,ModulesHrModule,Mail,   MulterModule.register({
    dest: './uploads', // Destination directory for uploaded files
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads'); // Setting the destination folder
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}.${file.originalname.split('.').pop()}`); // Appending original extension
      },
    }),
  }), ],
  controllers: [AppController,ModulesAuthController,UserController,ForgotPasswordController ],
  providers: [AppService,LocalStrategy],
})
export class AppModule {}
