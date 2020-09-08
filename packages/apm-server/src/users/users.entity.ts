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
import { Exclude } from 'class-transformer';
import { IsUserAlreadyExist } from './users.validator';
import { USER_ROLE } from './users.constants';
import { PasswordTransformer } from './password.transformer';

@Entity('apm_users')
export class UsersEntity extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;
    @Column() displayName: string;

    // @Validate(IsUserAlreadyExist, {
    //     message: 'User already exists'
    // })
    @IsEmail()
    @Column({ unique: true, nullable: true })
    email: string;

    @Column({
        name: 'password',
        length: 255,
        transformer: new PasswordTransformer(),
    })
    @Exclude()
    password: string;

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
    @Column({ comment: '姓名', length: 30 }) firstName: string;
    @Column({ comment: '姓名', length: 50 }) lastName: string;
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

    // @Column() userIdentity: any = {
    //     displayName: 'stbui',
    //     email: 'stbui',
    //     identifier: '123',
    //     customFields: [
    //         {
    //             value: '899元/月',
    //             key: 'pricingPlan',
    //         },
    //         {
    //             value: 'user',
    //             key: 'role',
    //         },
    //         {
    //             value: 'True',
    //             key: 'subscribedToEmail',
    //         },
    //     ],
    // };
}
