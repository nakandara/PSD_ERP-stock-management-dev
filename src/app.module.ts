import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/modules/user.module';
import { ModulesAuthModule } from './modules/auth/modules/auth.module';
import { ModulesHrModule } from './modules/hr/modules/hr.module';

@Module({
  imports: [UserModule, ModulesAuthModule, ModulesHrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
