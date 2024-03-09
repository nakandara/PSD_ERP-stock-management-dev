// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { ProfileImage } from './profile-image.entity';


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column() // Allow empty email values
  email: string;

  @Column()
  password: string;

  @Column()
  method: string;

  @Column({ default: false })
  status: boolean;

  @Column({ default: false }) // Set default value to false
  verify: boolean;

  @PrimaryGeneratedColumn('uuid') // Auto-generated and unique userId
  userId: string;

  @OneToOne(() => ProfileImage, { cascade: true, eager: true })
  @JoinColumn()
  profileImage: ProfileImage;

}
