// profile-image.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ProfileImage {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imagePath: string;

  @OneToOne(() => User, user => user.profileImage)
  @JoinColumn()
  user: User;
  profileImage: any;

}
