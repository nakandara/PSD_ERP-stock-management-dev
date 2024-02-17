import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulesHrService } from '../modules/hr.service';
import { CreateModulesHrDto } from '../dto/create-modules/hr.dto';
import { UpdateModulesHrDto } from '../dto/update-modules/hr.dto';

@Controller('modules/hr')
export class ModulesHrController {
  constructor(private readonly modulesHrService: ModulesHrService) {}

  @Post()
  create(@Body() createModulesHrDto: CreateModulesHrDto) {
    return this.modulesHrService.create(createModulesHrDto);
  }

  @Get()
  findAll() {
    return this.modulesHrService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesHrService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModulesHrDto: UpdateModulesHrDto) {
    return this.modulesHrService.update(+id, updateModulesHrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulesHrService.remove(+id);
  }
}
