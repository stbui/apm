import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { AccountService } from './account.service';
import { AccountEntity } from './account.entity';

@ApiTags('api/account')
@Controller('api/account')
export class AccountController extends CrudController<AccountEntity> {
    constructor(protected service: AccountService) {
        super();
    }

    @ApiOperation({ summary: 'profile' })
    @Get('profile')
    profile() {
        return this.service.profile();
    }

    @ApiOperation({ summary: 'projects' })
    @Get('projects')
    projects() {
        return this.service.projects();
    }

    @ApiOperation({ summary: 'tokens' })
    @Get('tokens')
    tokens() {
        return this.service.tokens();
    }

    @ApiOperation({ summary: 'tokens' })
    @Get('stats/sessions')
    stats_sessions() {
        return this.service.stats_sessions();
    }
}
