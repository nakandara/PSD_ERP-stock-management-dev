import { Module } from '@nestjs/common';
import { ModulesAuthService } from './auth.service';
import { ModulesAuthController } from './auth.controller';

@Module({
  controllers: [ModulesAuthController],
  providers: [ModulesAuthService],
})
export class ModulesAuthModule {}
