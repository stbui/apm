import {
    Controller,
    Get,
    Post,
    UseGuards,
    Body,
    Headers,
    Request,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Credentials } from './auth.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiResponse({ status: 201, description: 'Successful Login' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Post('signin')
    signIn(@Body() payload: Credentials) {
        return this.authService.signIn(payload);
    }

    @ApiResponse({ status: 201, description: 'Successful Registration' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Post('register')
    register(@Body() payload: Credentials) {
        return this.authService.register(payload);
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

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Get('me')
    @ApiResponse({ status: 200, description: 'Successful Response' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getLoggedInUser(@Request() request): Promise<any> {
        return request.user;
    }
}
