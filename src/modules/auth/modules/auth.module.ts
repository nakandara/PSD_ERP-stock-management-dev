import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../mailer/modules/jwt.strategy';
import { LocalStrategy } from '../../user/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../../user/modules/user.module';
import { ModulesAuthService } from './auth.service';
import { ModulesAuthController } from './auth.controller';
import { JwtAuthGuard } from '../mailer/modules/jwt-auth.guard';
import { GoogleStrategy } from '../mailer/modules/google.strategy';
import { SessionSerializer } from '../mailer/modules/session.serializer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/modules/user.entity';
import { FacebookStrategy } from '../mailer/modules/facebook.strategy';



@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [ModulesAuthController],
  providers: [ModulesAuthService, LocalStrategy, JwtStrategy,JwtAuthGuard,GoogleStrategy,FacebookStrategy, SessionSerializer],
  exports: [ModulesAuthService],
})
export class ModulesAuthModule {}
