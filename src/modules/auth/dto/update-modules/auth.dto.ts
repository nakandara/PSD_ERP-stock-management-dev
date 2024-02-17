import { PartialType } from '@nestjs/mapped-types';
import { CreateModulesAuthDto } from '../create-modules/auth.dto';

export class UpdateModulesAuthDto extends PartialType(CreateModulesAuthDto) {}
