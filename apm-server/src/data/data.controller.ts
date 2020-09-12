import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { DataService } from './data.service';
import { DataEntity } from './data.entity';
import { mock } from './countries';

@ApiTags('data')
@Controller('data')
export class DataController extends CrudController<DataEntity> {
    constructor(protected service: DataService) {
        super();
    }

    @Get('countries')
    countries() {
        return mock;
    }
}
