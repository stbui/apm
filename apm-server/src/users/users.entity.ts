import { ApiModelProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, BaseEntity, ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsArray, IsEmail, IsString, MinLength, Validate, } from 'class-validator';
import * as crypto from 'crypto';
import { Config } from '../config/config'
import { IsUsersAlreadyExist } from './users.validator';


@Entity()
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

    // @Validate(IsUsersAlreadyExist, {
    //     message: 'User already exists'
    // })
    @ApiModelProperty()
    @IsEmail()
    @Column()
    public email: string;

    @ApiModelProperty()
    @Column()
    @MinLength(6)
    public password: string;

    @ApiModelProperty()
    @IsArray()
    @Column({ type: 'text', array: true })
    public roles: string[];

    // @BeforeInsert()
    // hashPassword() {
    //     this.password = crypto.createHmac('sha256', Config.salt)
    //         .update(this.password)
    //         .digest('hex');;
    // }

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    modifiedAt: Date;

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
            userId: string,
        },
        facebook?: {
            userId: string,
        },
    };
}