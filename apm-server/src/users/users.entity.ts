import { ApiModelProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsArray,
  IsEmail,
  IsString,
  MinLength,
  Validate,
  IsEmpty,
} from 'class-validator';
import * as crypto from 'crypto';
import { Config } from '../config/config';
import { IsUserAlreadyExist } from './users.validator';
import { USER_ROLE } from './users.constants';

@Entity('apm_users')
export class UsersEntity extends BaseEntity {
  // @ApiModelProperty()
  // @PrimaryGeneratedColumn()
  // public id: string;

  @ApiModelProperty()
  @ObjectIdColumn()
  id: ObjectID;

  @ApiModelProperty()
  @IsString()
  @Column()
  public username: string;

  // @Validate(IsUserAlreadyExist, {
  //     message: 'User already exists'
  // })
  @ApiModelProperty()
  @IsEmail()
  @Column({ unique: true })
  public email: string;

  @ApiModelProperty()
  @Column()
  @MinLength(6)
  public password: string;

  @ApiModelProperty()
  @IsArray()
  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.DEFAULT,
  })
  roles: USER_ROLE;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @Column({ default: '' })
  ip: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column()
  lastLogin: Date;

  @Column({ type: 'jsonb', default: {} })
  profile: {
    name?: string;
    surname?: string;
    phone?: string;
    description?: string;
  };

  @Column({ type: 'jsonb' })
  oauth: {
    google?: {
      userId: string;
    };
    facebook?: {
      userId: string;
    };
  };
}
