/**
 * Auth controller.
 * @file 权限模块控制器
 * @module common/auth/controller
 * @author Stbui <https://github.com/stbui>
 */

import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Credentials } from './auth.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() body: Credentials) {
    return this.authService.signIn(body);
  }

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Get('signout')
  signOut() {
    return this.authService.signOut();
  }

  @Post('token')
  async createUserAccessToken(@Body() credentials: Credentials) {
    return await this.authService.createToken(credentials);
  }

  @Get('verify')
  @UseGuards(AuthGuard())
  async verify(@Headers('Authorization') token: string) {
    return this.authService.validateAccessToken(token);
  }
}
