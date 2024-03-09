import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpException,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-modules/user.dto';
import { JwtAuthGuard } from '../../auth/mailer/modules/jwt-auth.guard';
import { PersonalInfo } from '../entities/modules/personalInfo.entity';
import { UpdateResult } from 'typeorm';
import { UserRole } from '../entities/enum/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  @Get('role/:userId')
  getRole(@Param('userId') userId: string) {
    return this.userService.findOneRole(userId);
  }

  @Get('getUserInfo/:userId')
  getUserInfo(@Param('userId') userId: string) {
    return this.userService.findUserInfoByUserId(userId);
  }

  @Post('create-userInfo')
  async UserInfoCreate(@Body() body): Promise<any> {
    const {
      userId,
      fullName,
      dateOfBirth,
      gender,
      address,
      phoneNumber,
      email,
      occupation,
      jobTitle,
      homeNumber,
      highestEducation,
      universityName,
      degrees,
      graduationDate,
      currentAddress,
      permanentAddress,
      previousJobs,
      companyNames,
      EmploymentDates,
      jobResponsibilities,
      technicalSkills,
      softSkills,
      certification,
      spokenLanguage,
    } = body;
    const existingUser = await this.userService.findUserByUsernameID(userId);

    if (existingUser) {
      const existingPersonalInfo =
        await this.userService.findPersonalInfoByUserID(userId);
      if (existingPersonalInfo) {
        throw new HttpException(
          'PersonalInfo with this PersonalInfo already exists',
          HttpStatus.CONFLICT,
        );
      }
      const user = await this.userService.createUserInfo(
        userId,
        fullName,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        email,
        occupation,
        jobTitle,
        homeNumber,
        highestEducation,
        universityName,
        degrees,
        graduationDate,
        currentAddress,
        permanentAddress,
        previousJobs,
        companyNames,
        EmploymentDates,
        jobResponsibilities,
        technicalSkills,
        softSkills,
        certification,
        spokenLanguage,
      );
      return { user };
    } else {
      throw new HttpException(
        'User not found in the database',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch('updateUserInfo/:userId')
  async updatePersonalInfo(
    @Param('userId') userId: string,
    @Body() updatedInfo: Partial<PersonalInfo>, // Using Partial to allow updating only specific fields
  ): Promise<{ updatedInfo: PersonalInfo }> {
    console.log('Received userId:', userId); // Log the received userId
    console.log('Updated Info:', updatedInfo);

    try {
      const existingUser = await this.userService.findUserByUsernameID(userId);

      if (!existingUser) {
        throw new HttpException(
          'User not found in the database',
          HttpStatus.NOT_FOUND,
        );
      }

      const existingPersonalInfo =
        await this.userService.findPersonalInfoByUserID(userId);

      if (!existingPersonalInfo) {
        throw new HttpException(
          'PersonalInfo not found for the user',
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedPersonalInfo: PersonalInfo = {
        ...existingPersonalInfo,
        ...updatedInfo,
      };

      const updateResult: UpdateResult =
        await this.userService.updatePersonalInfo(userId, updatedPersonalInfo);

      if (updateResult.affected === 0) {
        throw new HttpException(
          'Failed to update PersonalInfo',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return { updatedInfo: updatedPersonalInfo };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('deleteUserInfo/:userId')
  async deletePersonalInfo(
    @Param('userId') userId: string,
  ): Promise<{ message: string }> {
    try {
      const existingUser = await this.userService.findUserByUsernameID(userId);

      if (!existingUser) {
        throw new HttpException(
          'User not found in the database',
          HttpStatus.NOT_FOUND,
        );
      }

      const existingPersonalInfo =
        await this.userService.findPersonalInfoByUserID(userId);

      if (!existingPersonalInfo) {
        throw new HttpException(
          'PersonalInfo not found for the user',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.userService.deletePersonalInfo(userId);

      return { message: 'PersonalInfo deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('assignRole')
  async assignUserRole(
    @Body() body: { userId: string; role: UserRole },
  ): Promise<{ message: string }> {
    try {
      const { userId, role } = body;
      const existingUser = await this.userService.findUserByUsernameID(userId);
      if (existingUser) {
        await this.userService.assignUserRole(userId, role);
        return {
          message: `Role ${role} assigned to user with userId ${userId}`,
        };
      } else {
        return { message: 'User not found in the database' };
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('verifyEmail')
  async verifyEmail(
    @Body() body: { userId: string; email: string; otp: number },
  ): Promise<{ message: string }> {
    try {
      const { userId, email, otp } = body;
      const existingUser = await this.userService.findOne(userId);
      console.log(existingUser, '++++++++');

      if (existingUser) {
        await this.userService.UpdateUserStatus(existingUser, otp, email);
        return { message: `Successfully verify  ${email}` };
      } else {
        return { message: 'User not found in the database' };
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('sendVerifyEmail')
  async addVerifyEmail(
    @Body() body: { email: string; userId: string },
  ): Promise<{ message: string; userId: string }> {
    try {
      const { email, userId } = body;
      const existingUser = await this.userService.findOne(userId);
      console.log(existingUser, '########');

      if (existingUser) {
        await this.userService.createEmailOTP(email);
        return { message: `send OTP ${email}`, userId };
      } else {
        return { message: 'User not found in the database', userId };
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':userId/upload-profile-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      const serverBaseUrl = 'http://localhost:8080';
      const imagePath = `${serverBaseUrl}/uploads/${file.filename}`;

      await this.userService.uploadProfileImage(file, userId, imagePath);

      res.status(200).json({
        success: true,
        message: 'Profile image uploaded successfully',
        imagePath,
      });
    } catch (error) {
      console.error('Error uploading profile image:', error.message);
      // Send an error response
      res.status(500).json({
        success: false,
        message: 'Failed to upload profile image',
        error: error.message,
      });
    }
  }

  @Post('register')
  async register(@Body() body): Promise<any> {
    const { fullName, password, email, confirmPassword, verify } = body;

    const existingUser = await this.userService.findUserByEmailAndUserName(
      fullName,
      email,
    );

    if (existingUser) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.CONFLICT,
      );
    }

    if (password !== confirmPassword) {
      throw new HttpException(
        'Password and confirmPassword do not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.createUser(
      fullName,
      password,
      email,
      verify,
    );

    return { fullName: user.fullName, email: user.email, userId: user.userId };
  }

  @Post('faceBookRegister')
  async FaceBookRegister(@Body() body): Promise<any> {
    const { fullName, password, email, confirmPassword, verify } = body;

    const existingUser = await this.userService.findUserByEmailAndUserName(
      fullName,
      email,
    );

    if (existingUser) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.CONFLICT,
      );
    }

    if (password !== confirmPassword) {
      throw new HttpException(
        'Password and confirmPassword do not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.createFaceBookUser(
      fullName,
      password,
      email,
      verify,
    );

    return { fullName: user.fullName, email: user.email, userId: user.userId };
  }
}

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return 'This route is protected';
  }
}
