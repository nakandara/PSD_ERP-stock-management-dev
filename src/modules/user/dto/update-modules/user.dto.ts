import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../create-modules/user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
