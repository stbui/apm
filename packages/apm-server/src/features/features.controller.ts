import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { FeaturesService } from './features.service';
import { FeaturesEntity } from './features.entity';

@ApiTags('api/features')
@Controller('api/features')
export class FeaturesController extends CrudController<FeaturesEntity> {
    constructor(protected service: FeaturesService) {
        super();
    }

    @ApiOperation({ summary: 'id' })
    @Get(':id')
    id(@Param('id') id) {
        return {
            isAssureCoWorkaroundEnabled: false,
            isToolkitEnabled: true,
            isControlTakeoverEnabled: true,
            ignoreFormsAutofill: false,
            captureMetadataOnly: true,
        };
    }
}
