// user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonalInfo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  userId: string;


  @Column({ nullable: true }) // Allow empty email values
  fullName: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  currentAddress: string;

  @Column()
  permanentAddress: string;


  @Column()
  occupation: string;

  @Column()
  jobTitle: string;

  @Column()
  homeNumber: string;

  @Column()
  highestEducation: string;

  @Column()
  universityName: string;

  @Column()
  degrees: string;

  @Column()
  graduationDate: Date;

  @Column()
  previousJobs: string;

  @Column()
  companyNames: string;

  

  @Column()
  EmploymentDates: Date;

  @Column()
  jobResponsibilities: string;

  @Column()
  technicalSkills: string;

  @Column()
 softSkills: string;

 @Column()
 certification: string;

 @Column()
 spokenLanguage: string;



}
