import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsEntity } from './analytics.entity';

@ApiTags('api/analytics')
@Controller('api/analytics')
export class AnalyticsController extends CrudController<AnalyticsEntity> {
    constructor(protected service: AnalyticsService) {
        super();
    }

    @Get()
    analytics() {
        return '';
    }

    @Post('sessions/:id')
    sessions_id(@Param('id') id) {
        return '';
    }
}
