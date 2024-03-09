import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from './user.controller';
import { User } from "../entities/modules/user.entity";
import { PersonalInfo } from '../entities/modules/personalInfo.entity';
import { Role } from '../entities/modules/role.entity';
import { MailService } from 'src/modules/auth/mailer/modules/modules/mail.service';
import { ProfileImage } from '../entities/modules/profile-image.entity';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';



@Module({
  imports: [TypeOrmModule.forFeature([User,PersonalInfo,Role,ProfileImage]),MulterModule.register({
    dest: './uploads',
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads'); 
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}.${file.originalname.split('.').pop()}`); // Appending original extension
      },
    }),
  }),],
  controllers: [UserController],
  providers: [UserService,MailService],
  exports: [UserService,MailService,MulterModule],
})
export class UserModule {}
