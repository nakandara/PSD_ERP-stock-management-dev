import { Injectable } from '@nestjs/common';
import { CreateModulesAuthDto } from '../dto/create-modules/auth.dto';
import { UpdateModulesAuthDto } from '../dto/update-modules/auth.dto';
import { UserService } from '../../user/modules/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/entities/modules/user.entity';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModulesAuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async RegisterCreateUser(user: { email: string; fullName: string }) {
    const newUser = this.userRepository.create({
      email: user.email,
      fullName: user.fullName,
      password: 'GOOGLE_AUTH_PASSWORD',
      verify: true,
      method: 'GOOGLE',
    });

    const existingUser = await this.userService.findUserByEmailAndUserName(
      user.fullName,
      user.email,
    );

    console.log(existingUser, 'newUser');

    if (!existingUser) {
      const saveUser = await this.userRepository.save(newUser);
      if (saveUser) {
        const validateUser = await this.googleValidateUser(
          user.fullName,
          user.fullName,
          user.email,
        );

        if (!validateUser) {
          // Return null if credentials are invalid
          return null;
        }

        const payload = {
          username: validateUser.username,
          sub: validateUser.userId,
        };
        if (!existingUser.status) {
          return { user: 'please continue Your flow' };
        }
        const access_token = this.jwtService.sign(payload);
        console.log(access_token, 'access_tokenaccess_token');

        return { user, access_token };
      }
    }
    const payload = {
      username: existingUser.fullName,
      sub: existingUser.userId,
    };
    if (!existingUser.status) {
      return { user: 'please continue Your flow' };
    }
    const access_token = this.jwtService.sign(payload);
    return { user, access_token };
    // Generate JWT token
  }

  async FaceBookCreateUser(user: { email: string; fullName: string }) {
    const newUser = this.userRepository.create({
      email: user.email,
      fullName: user.fullName,
      password: 'GOOGLE_AUTH_PASSWORD',
      verify: true,
      method: 'GOOGLE',
    });

    const existingUser = await this.userService.findUserByEmailAndUserName(
      user.fullName,
      user.email,
    );

    console.log(existingUser, 'newUser');

    if (!existingUser) {
      const saveUser = await this.userRepository.save(newUser);
      if (saveUser) {
        const validateUser = await this.googleValidateUser(
          user.fullName,
          user.fullName,
          user.email,
        );

        if (!validateUser) {
          // Return null if credentials are invalid
          return null;
        }

        const payload = {
          username: validateUser.username,
          sub: validateUser.userId,
        };
        if (!existingUser.status) {
          return { user: 'please continue Your flow' };
        }
        const access_token = this.jwtService.sign(payload);
        console.log(access_token, 'access_tokenaccess_token');

        return { user, access_token };
      }
    }
    const payload = {
      username: existingUser.fullName,
      sub: existingUser.userId,
    };
    if (!existingUser.status) {
      return { user: 'please continue Your flow' };
    }
    const access_token = this.jwtService.sign(payload);
    return { user, access_token };
    // Generate JWT token
  }

  async findUserByEmailAndUsername(
    fullName: string,
    email: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { fullName, email } });
  }

  create(createModulesAuthDto: CreateModulesAuthDto) {
    return 'This action adds a new modules/auth';
  }

  findAll() {
    return `This action returns all modules/auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modules/auth`;
  }

  update(id: number, updateModulesAuthDto: UpdateModulesAuthDto) {
    return `This action updates a #${id} modules/auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} modules/auth`;
  }

  async validateUser(
    fullName: string,
    password: string,
    email: string,
  ): Promise<any> {
    console.log(fullName, password, email, 'dddddddddddddd');

    const user = await this.userService.findUserByUsername(fullName);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      const tempUser = { fullName, password, email };

      return tempUser;
    }
    return null;
  }

  async googleValidateUser(
    fullName: string,
    password: string,
    email: string,
  ): Promise<any> {
    const user = await this.userService.findUserByUsername(fullName);

    if (user && user.email === email) {
      const { password, ...result } = user;

      return user;
    }
    return null;
  }

  async login(
    fullName: string,
    password: string,
    email: string,
  ): Promise<{ user: any; access_token?: string }> {
    const user = await this.userService.findUserByEmailAndUserName(
      fullName,
      email,
    );

    if (!user) {
      return { user: null };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { user: null };
    }

    if (!user.verify) {
      return { user: 'please continue Your flow' };
    }

    // Generate JWT token
    const payload = { fullName: user.fullName, sub: user.userId };
    const access_token = this.jwtService.sign(payload);

    // Return user and access token
    return { user, access_token };
  }
}
