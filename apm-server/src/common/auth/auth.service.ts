import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Credentials } from './auth.dto';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

    async signIn(data) {
        const user = await this.usersService.findOneByEmail(data.email);
        const passwordMatch = this.usersService.validateCredentials(user, data.passwrod);

        if (!passwordMatch) {
            throw new UnauthorizedException();
        }

        const accessToken = await this.createAccessTokenFromUser(user);

        return {
            accessToken,
            user,
        };
    }

    /**
     * 注册新用户
     * @param data 邮箱和密码
     */
    register(data: any) {
        return this.usersService.register(data);
    }

    async signOut() {
        // clear token
    }

    async createToken(credentials: Credentials) {
        // const payload = { email: 1, id: 2 };
        const payload = this.usersService.login(credentials);

        return this.createAccessTokenFromUser(payload);
    }

    async validateAccessToken(accessToken: string) {
        return this.jwtService.verify(accessToken);
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findOneById(payload.id);
    }

    private createAccessTokenFromUser(user): string {
        const payload = { type: 'CLIENT', sub: user.email, id: user.id };

        return this.jwtService.sign(payload);
    }
}
