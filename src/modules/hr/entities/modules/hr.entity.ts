import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Hr {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // Add other properties as needed for your entity
  // For example, you might have properties like 'name', 'position', etc.
  propertyName: string;

  // Add more columns and properties as needed for your entity

  // You can also add relationships with other entities if necessary

}
