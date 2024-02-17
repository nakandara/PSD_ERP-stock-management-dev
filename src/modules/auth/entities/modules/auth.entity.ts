import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // Add other properties as needed for your entity
  // For example, you might have properties like 'username', 'password', etc.
  username: string;

  // Add more columns and properties as needed for your entity

  // You can also add relationships with other entities if necessary

}
