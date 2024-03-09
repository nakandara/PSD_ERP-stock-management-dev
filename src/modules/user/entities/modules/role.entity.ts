// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enum/role.enum';

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id: number;

  @Column() // Auto-generated and unique userId
  userId: string;

 
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  Role: UserRole;

}
