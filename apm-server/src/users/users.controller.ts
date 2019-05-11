import {
  Controller,
  Get,
  Query,
  Body,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller('user')
export class UserController extends CrudController<UsersEntity> {
  constructor(protected service: UsersService) {
    super();
  }

  @ApiOperation({ title: '用户登陆' })
  @Post('login')
  async login(@Body() loginUserDto): Promise<UsersEntity> {
    const _user = await this.service.findOne(loginUserDto);

    if (!_user) throw new BadRequestException();

    return _user;
  }

  @Get('/search')
  async findOneByEmail(@Query() email) {
    return await this.service.findOneByEmail(email);
  }
}
