import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { AccountService } from './account.service';
import { AccountEntity } from './account.entity';

@ApiTags('api/auth_settings')
@Controller('api/auth_settings')
export class AccountController extends CrudController<AccountEntity> {
    constructor(protected service: AccountService) {
        super();
    }
}
