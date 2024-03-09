import { Injectable } from '@nestjs/common';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
  UpdateResult,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-modules/user.dto';
import { UpdateUserDto } from '../dto/update-modules/user.dto';
import { User } from '../entities/modules/user.entity';
import { PersonalInfo } from '../entities/modules/personalInfo.entity';
import { UserRole } from '../entities/enum/role.enum';
import { Role } from '../entities/modules/role.entity';
import * as bcrypt from 'bcrypt';
import { PasswordResetService } from 'src/modules/auth/mailer/modules/modules/password-reset.service';
import { MailService } from 'src/modules/auth/mailer/modules/modules/mail.service';
import { ProfileImage } from '../entities/modules/profile-image.entity';

import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly otpMap: Map<string, string> = new Map();
  private readonly otpLength: number = 6; // Length of the OTP

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PersonalInfo) 
    private personalInfoRepository: Repository<PersonalInfo>,

    @InjectRepository(Role) 
    private roleRepository: Repository<Role>,
    private readonly mailService: MailService,

    @InjectRepository(ProfileImage)
    private profileImageRepository: Repository<ProfileImage>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(userId: string) {
    return this.userRepository.findOne({ where: { userId } });
  }

  findOneRole(userId: string) {
    return this.roleRepository.findOne({ where: { userId } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createUser(
    fullName: string,
    password: string,
    email: string,
    verify: boolean,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const body = {
      fullName,
      email,
      password: hashedPassword,
      verify,
      method: 'NORMAL',
    };
    const user = this.userRepository.create(body);
    const otp = this.generateResetToken(email);
    await this.mailService.sendFVerifyEmail(email, otp);

    return await this.userRepository.save(user);
  }

  async createFaceBookUser(
    fullName: string,
    password: string,
    email: string,
    verify: boolean,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const body = {
      fullName,
      email,
      password: hashedPassword,
      verify,
      method: 'FACEBOOK',
    };
    const user = this.userRepository.create(body);
    const otp = this.generateResetToken(email);
    await this.mailService.sendFVerifyEmail(email, otp);

    return await this.userRepository.save(user);
  }

  async createEmailOTP(email: string): Promise<any> {
    const otp = this.generateResetToken(email);
    const verifyMethod = await this.mailService.sendFVerifyEmail(email, otp);
    console.log(verifyMethod, 'oooooooooooo');

    return `This  a #${otp} user`;
  }

  async updateUser(user: User): Promise<User> {
    try {
      const updatedUser = await this.userRepository.save(user);

      return updatedUser;
    } catch (error) {
      // Handle any errors that may occur during the database update
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  async UpdateUserStatus(
    user: User,
    otp: number,
    email: string,
  ): Promise<User> {
    try {
      const isOTPValid = this.verifyResetToken(email, otp.toString());

      if (!isOTPValid) {
        throw new Error('Invalid OTP');
      }
      user.verify = true;
      // Save the updated user
      const updatedUser = await this.userRepository.save(user);
      const verifyStatus = await this.findOne(user.userId);
      if (verifyStatus.verify) {
        user.status = true;
        const updatedUserAndVerify = await this.userRepository.save(user);
        return updatedUserAndVerify;
      } else {
        console.log('User is already verified');
        return updatedUser;
      }
    } catch (error) {
    
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  async findUserByUsername(fullName: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { fullName } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserInfoByUserId(
    userId: string,
  ): Promise<PersonalInfo | undefined> {
    return this.personalInfoRepository.findOne({ where: { userId } });
  }

  async findUserByUsernameID(userId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { userId } });
  }

  async findUserByEmailAndID(
    userId: string,
    email: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { userId, email } });
  }

  async findUserByEmailAndUserName(
    fullName: string,
    email: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { fullName, email } });
  }

  async findPersonalInfoByUserID(
    userId: string,
  ): Promise<PersonalInfo | undefined> {
    return this.personalInfoRepository.findOne({ where: { userId } });
  }

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

  private generateRandomOTP(): string {
    // Generate a random numeric OTP
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < this.otpLength; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  async createUserInfo(
    userId: string,
    fullName: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    phoneNumber: string,
    email: string,
    occupation: string,
    jobTitle: string,
    homeNumber: string,
    highestEducation: string,
    universityName: string,
    degrees: string,
    graduationDate: Date,
    currentAddress: string,
    permanentAddress: string,
    previousJobs: string,
    companyNames: string,
    EmploymentDates: Date,
    jobResponsibilities: string,
    technicalSkills: string,
    softSkills: string,
    certification: string,
    spokenLanguage: string,
  ): Promise<PersonalInfo | undefined> {
    const user = this.personalInfoRepository.create({
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
    });
    return await this.personalInfoRepository.save(user);
  }

  async updatePersonalInfo(
    userId: string,
    updatedInfo: PersonalInfo,
  ): Promise<UpdateResult> {
    return this.personalInfoRepository.update({ userId }, updatedInfo);
  }

  async deletePersonalInfo(userId: string): Promise<void> {
    await this.personalInfoRepository.delete({ userId });
  }

  async assignUserRole(
    userId: string,
    role: UserRole,
  ): Promise<Role | undefined> {
    const existingRole = await this.roleRepository.findOne({
      where: { userId },
    });

    if (existingRole) {
      // If the user already has a role, update it
      existingRole.Role = role;
      await this.roleRepository.save(existingRole);
      return existingRole; // Return the updated role
    } else {
      // If the user does not have a role, create a new one
      const newRole = this.roleRepository.create({ userId, Role: role });

      await this.roleRepository.save(newRole);

      return newRole; // Return the newly created role
    }
  }

  async uploadProfileImage(
    file: Express.Multer.File,
    userId: string,
    imagePath: string,
  ): Promise<void> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    let profileImage = user.profileImage;

    if (!profileImage) {
      profileImage = new ProfileImage();
      profileImage.user = user;
    }

    profileImage.imagePath = imagePath;

    await this.profileImageRepository.save(profileImage);
  }
}
