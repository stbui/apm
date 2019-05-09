import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { UsersEntity } from './users.entity';
import { USER_TOKEN } from './users.constants';
import { User } from './users.interface'

@Injectable()
export class UsersService extends CrudService<UsersEntity> {

    constructor(@Inject(USER_TOKEN) protected readonly repository: Repository<UsersEntity>) {
        super();
    }

    async login(credentials) {
        const user = await this.repository.findOne({ email: credentials.email, password: credentials.password });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async register(data) {

        const { username } = data; let user = await this.repository.findOne({ where: { username } });
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
    async updatePassword(username: string, password: string) {
    }


    async resendVerificationEmail(email: string) {
    }

    async verifyEmail(token: string) {

    }

    async requestPasswordReset(email: string) {

    }

    /**
     * 通过邮箱地址来获取单个用户
     * @param email 用户的邮箱地址
     * @returns User 单个用户
     */
    public async findOneByEmail(email: string): Promise<any> {
        return await this.findOne({ email: email })
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
}
