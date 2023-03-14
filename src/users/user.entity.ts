import { Logger } from '@nestjs/common';

import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    Logger.log(`inserted user with ID ${this.id}....................`);
  }
  @AfterRemove()
  logRemove() {
    Logger.log(` remove user With Id ${this.id}....................`);
  }
  @AfterUpdate()
  logUpdate() {
    Logger.log(`update user with ID ${this.id}....................`);
  }
}
