import { Injectable } from '@nestjs/common';
import { CreateModulesAuthDto } from '../dto/create-modules/auth.dto';
import { UpdateModulesAuthDto } from '../dto/update-modules/auth.dto';

@Injectable()
export class ModulesAuthService {
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
}
