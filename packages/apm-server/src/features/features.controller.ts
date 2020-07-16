import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { AccountService } from './features.service';
import { FeaturesEntity } from './features.entity';

@ApiTags('features')
@Controller('features')
export class AccountController extends CrudController<FeaturesEntity> {
    constructor(protected service: AccountService) {
        super();
    }

    @ApiOperation({ summary: 'id' })
    @Get(':id')
    id() {
        return {
            isAssureCoWorkaroundEnabled: false,
            isToolkitEnabled: true,
            isControlTakeoverEnabled: true,
            ignoreFormsAutofill: false,
            captureMetadataOnly: true,
        };
    }
}
