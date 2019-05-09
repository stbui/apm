import { Controller, Get, Query } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity'

@ApiBearerAuth()
@ApiUseTags('users')
@Controller('users')
export class UserController extends CrudController<UsersEntity> {
    constructor(protected service: UsersService) {
        super();
    }

    @Get('/search')
    async findOneByEmail(@Query() email) {
        return await this.service.findOneByEmail(email)
    }
}
