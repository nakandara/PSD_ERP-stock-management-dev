import { Module } from '@nestjs/common';
import { ModulesHrService } from './hr.service';
import { ModulesHrController } from './hr.controller';

@Module({
  controllers: [ModulesHrController],
  providers: [ModulesHrService],
})
export class ModulesHrModule {}
