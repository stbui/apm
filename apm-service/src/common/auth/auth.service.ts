import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { Credentials } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async signIn(data) {
    const user = await this.userService.findOneByEmailWithPassword(data.email);
    const passwordMatch = this.userService.validateCredentials(
      user,
      data.passwrod
    );

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.createAccessTokenFromUser(user);

    return {
      accessToken,
      user
    };
  }

  /**
   * 注册新用户
   * @param data 邮箱和密码
   */
  register(data: any) {
    return this.userService.register(data);
  }

  async signOut() {
    // clear token
  }

  async createToken(credentials: Credentials) {
    const payload = { email: 1, id: 2 };

    return this.createAccessTokenFromUser(payload);
  }

  async validateAccessToken(accessToken: string) {
    return this.jwtService.verify(accessToken);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOneById(payload.id);
  }

  private createAccessTokenFromUser(user): string {
    const payload = { type: 'CLIENT', sub: user.email, id: user.id };

    return this.jwtService.sign(payload);
  }
}
