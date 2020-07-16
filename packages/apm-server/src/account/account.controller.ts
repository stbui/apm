import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { AccountService } from './account.service';
import { AccountEntity } from './account.entity';

@ApiTags('account')
@Controller('account')
export class AccountController extends CrudController<AccountEntity> {
    constructor(protected service: AccountService) {
        super();
    }

    @ApiOperation({ summary: 'profile' })
    @Get('profile')
    profile() {
        return {
            lastName: 'ui',
            organizationName: 'stbui',
            firstName: 'stb',
            timezoneName: 'UTC',
            email: 'stbui@stbui.com',
        };
    }

    @ApiOperation({ summary: 'projects' })
    @Get('projects')
    projects() {
        return [
            {
                isOwner: true,
                isSubscribeForReportsEnabled: true,
                name: 'stbui',
                id: 10679,
                isSubscribedForReports: true,
                isSubscribedForAlerts: true,
            },
        ];
    }

    @ApiOperation({ summary: 'tokens' })
    @Get('tokens')
    tokens() {
        return [];
    }

    @ApiOperation({ summary: 'tokens' })
    @Get('stats/sessions')
    stats_sessions() {
        return { sessionsLimitForPlan: 1000, sessionsCountForCurrentPeriod: 1 };
    }
}
