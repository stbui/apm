import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { AuthMethodService } from './auth_method.service';
import { AuthMethodEntity } from './auth_method.entity';

@ApiTags('api/auth_method')
@Controller('api/auth_method')
export class AuthMethodController extends CrudController<AuthMethodEntity> {
    constructor(protected service: AuthMethodService) {
        super();
    }

    @Get('/:name')
    websites_name() {
        return { authMethod: 'default' };
    }
}
