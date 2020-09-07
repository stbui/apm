import {
    Injectable,
    Inject,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { CrudService } from '../common/crud/crud.service';
import { UsersEntity } from './users.entity';
import { USER_TOKEN } from './users.constants';
import { User } from './users.interface';

@Injectable()
export class UsersService extends CrudService<UsersEntity> {
    constructor(
        @Inject(USER_TOKEN)
        protected readonly repository: Repository<UsersEntity>,
    ) {
        super();
    }

    async findOne(loginUser): Promise<UsersEntity> {
        const findOneOptions = {
            email: loginUser.email,
            password: crypto
                .createHmac('sha256', loginUser.password)
                .digest('hex'),
        };

        return await this.repository.findOne(findOneOptions);
    }

    async login(credentials) {
        const user = await this.repository.findOne({
            email: credentials.email,
            password: credentials.password,
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async register(data) {
        const { username } = data;
        let user = await this.repository.findOne({ where: { username } });
        if (user) {
            throw new BadRequestException('User already exists');
        }

        user = await this.create(data);
        return user;
    }

    /**
     * 更新用户密码
     * @param username
     * @param password
     */
    async updatePassword(username: string, password: string) {}

    async resendVerificationEmail(email: string) {}

    async verifyEmail(token: string) {}

    async requestPasswordReset(email: string) {}

    /**
     * 通过邮箱地址来获取单个用户
     * @param email 用户的邮箱地址
     * @returns User 单个用户
     */
    public async findOneByEmail(email: string): Promise<any> {
        return await this.findOne({ email: email });
    }

    /**
     * 通过其电子邮件地址获取单个用户，并返回密码字段
     * @param email 用户的邮箱地址
     * @returns User 单个用户
     */
    public findOneByEmailWithPassword(email: string): Promise<any> {
        return this.findOne({ email: email });
    }

    public validateCredentials(user, password): Boolean {
        return password === user.password;
    }

    // test

    test() {
        return {
            created: 1591023516.0,
            email: 'stbui@stbui.com',
            isVerified: false,
            organizationUrl: 'clusterhub',
            isAdmin: false,
            verificationToken: 'da7d7bf92c2d4479999bc8509e493c7c',
            hasActivePlan: true,
            trialDaysLeft: 7,
            organizationName: 'clusterhub@aliyun.com',
            specialOffer: null,
            timezoneName: 'UTC',
            organizationRole: 'Product Management',
            firstName: 'G',
            id: 6265,
            lastName: 'B',
            isTrial: true,
            role: 'user',
        };
    }

    test_login() {
        return {
            hasActivePlan: true,
            verificationToken: '5050f71368cf465bbaecadba4cdec022',
            specialOffer: null,
            token:
                'eyJhbGciOiJIUzI1NiIsImlhdCI6MTU5Mjc4OTQyMiwiZXhwIjoxNjI0MzI1NDIyfQ.eyJ1c2VyX2lkIjo2MzA5fQ.W_Rsx8jmY4VWh-QsFHTufxLvt_Ws3VZOM_Hk4PZmJdU',
            id: 6309,
            organizationUrl: 'stbui',
            firstName: 'stb',
            isTrial: true,
            email: 'stbui@stbui.com',
            created: 1592746402.0,
            lastName: 'ui',
            isAdmin: false,
            organizationRole: 'Product Management',
            trialDaysLeft: 365,
            isVerified: false,
        };
    }
}
