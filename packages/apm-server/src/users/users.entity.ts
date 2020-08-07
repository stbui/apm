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

    @CreateDateColumn() created: Date;
    @UpdateDateColumn() modifiedAt: Date;
    @Column() lastLogin: Date;
    @Column({ comment: '组织名称' }) organizationName: string;
    @Column({ comment: '组织角色' }) organizationRole: string;
    @Column({ comment: '组织url' }) organizationUrl: string;
    @Column({ nullable: true }) specialOffer: string;
    @Column({ comment: '试用天数' }) trialDaysLeft: number;
    @Column({ comment: '令牌' }) verificationToken: string;
    @Column() hasActivePlan: boolean;
    @Column() isAdmin: boolean;
    @Column({ comment: '试用状态' }) isTrial: boolean;
    @Column() isVerified: boolean;
    @Column({ comment: '姓名' }) firstName: string;
    @Column({ comment: '姓名' }) lastName: string;
    @Column({ comment: '时区' }) timezoneName: string;

    // 即将移除
    @Column() pricingPlan: string = 'free';
    @Column() ip: string;
    @Column() accountIsSettingUp: number;

    @IsArray()
    @Column({
        type: 'enum',
        enum: USER_ROLE,
        default: USER_ROLE.DEFAULT,
    })
    role: USER_ROLE;

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
