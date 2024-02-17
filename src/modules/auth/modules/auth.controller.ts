import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulesAuthService } from './auth.service';
import { CreateModulesAuthDto } from '../dto/create-modules/auth.dto';
import { UpdateModulesAuthDto } from '../dto/update-modules/auth.dto';

@Controller('modules/auth')
export class ModulesAuthController {
  constructor(private readonly modulesAuthService: ModulesAuthService) {}

  @Post()
  create(@Body() createModulesAuthDto: CreateModulesAuthDto) {
    return this.modulesAuthService.create(createModulesAuthDto);
  }

  @Get()
  findAll() {
    return this.modulesAuthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesAuthService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModulesAuthDto: UpdateModulesAuthDto) {
    return this.modulesAuthService.update(+id, updateModulesAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulesAuthService.remove(+id);
  }
}
