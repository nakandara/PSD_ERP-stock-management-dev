import { Injectable } from '@nestjs/common';
import { CreateModulesHrDto } from '../dto/create-modules/hr.dto';
import { UpdateModulesHrDto } from '../dto/update-modules/hr.dto';

@Injectable()
export class ModulesHrService {
  create(createModulesHrDto: CreateModulesHrDto) {
    return 'This action adds a new modules/hr';
  }

  findAll() {
    return 'This action returns all modules/hr';
  }

  findOne(id: number) {
    return `This action returns a #${id} modules/hr`;
  }

  update(id: number, updateModulesHrDto: UpdateModulesHrDto) {
    return `This action updates a #${id} modules/hr`;
  }

  remove(id: number) {
    return `This action removes a #${id} modules/hr`;
  }
}
