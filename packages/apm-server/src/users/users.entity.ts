import {
    BeforeInsert,
    Column,
    Entity,
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
import { IsUserAlreadyExist } from './users.validator';
import { USER_ROLE } from './users.constants';

@Entity('apm_users')
export class UsersEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;
    @Column() displayName: string;

    // @Validate(IsUserAlreadyExist, {
    //     message: 'User already exists'
    // })
    @IsEmail()
    @Column({ unique: true })
    email: string;

    @Column()
    @MinLength(6)
    password: string;

    @BeforeInsert()
    hashPassword() {
        this.password = crypto
            .createHmac('sha256', this.password)
            .digest('hex');
    }

    @Column() pricingPlan: string = 'free';
    @Column() ip: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() modifiedAt: Date;
    @Column() lastLogin: Date;
    @Column({ comment: '组织' }) organizationName: string;
    @Column({ comment: '组织' }) organizationRole: string;
    @Column({ comment: '组织path' }) organizationUrl: string;
    @Column() specialOffer: string;
    @Column() trialDaysLeft: number;
    @Column() verificationToken: string;
    @Column() accountIsSettingUp: number;
    @Column() hasActivePlan: number;
    @Column() isAdmin: number;
    @Column() isTrial: number;
    @Column() isVerified: number;

    @IsArray()
    @Column({
        type: 'enum',
        enum: USER_ROLE,
        default: USER_ROLE.DEFAULT,
    })
    roles: USER_ROLE;

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
