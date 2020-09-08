import { Controller, Get, Query, Body, Post, UsePipes } from '@nestjs/common';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiBody,
    ApiResponse,
} from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { loginUserDto, CreateUserDto } from './users.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController extends CrudController<UsersEntity> {
    constructor(protected service: UsersService) {
        super();
    }

    @Get()
    @ApiOperation({ summary: '获取所有用户的列表' })
    @ApiResponse({ status: 200, description: 'User Found.' })
    @ApiResponse({ status: 404, description: 'No Users found.' })
    getAllUsers() {}

    @ApiOperation({ summary: '创建新用户' })
    @ApiBody({ type: CreateUserDto })
    @UsePipes(new ValidationPipe())
    @Post()
    create(@Body() createUser: CreateUserDto): Promise<UsersEntity> {
        return this.service.register(createUser);
    }

    @ApiOperation({ summary: '用户登陆' })
    @ApiBody({ type: loginUserDto })
    @Post('login')
    async login(@Body() loginUser: loginUserDto): Promise<UsersEntity> {
        const user = await this.service.findOne(loginUser);

        return user;
    }

    @Get('search')
    async findOneByEmail(@Query() email) {
        return await this.service.findOneByEmail(email);
    }
}
