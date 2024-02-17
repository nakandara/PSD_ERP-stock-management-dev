import { PartialType } from '@nestjs/mapped-types';
import { CreateModulesHrDto } from '../create-modules/hr.dto';

export class UpdateModulesHrDto extends PartialType(CreateModulesHrDto) {}
