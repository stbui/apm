import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Put,
    Request,
    Headers,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiCookieAuth,
    ApiResponse,
    ApiBody,
} from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { AccountService } from './account.service';
import { AccountEntity } from './account.entity';
import { CreateAccountDto, UpdateAccountDto } from './account.dto';
import { WebsiteService } from '../website/website.service';

@ApiTags('account')
@Controller('api/account')
export class AccountController extends CrudController<AccountEntity> {
    constructor(
        protected service: AccountService,
        protected websiteService: WebsiteService,
    ) {
        super();
    }

    // 从cookie中获取的用户
    @ApiOperation({ summary: 'Account Settings' })
    @ApiCookieAuth()
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get('profile')
    getprofile(@Request() req, @Headers('authorization') authorization) {
        const test =
            authorization ||
            'Basic b3BlbnZwc0BhbGl5dW4uY29tOiFAI1FXRTEyM3F3ZQ==';

        const authToken = req.cookies.authToken;
        const organization = req.cookies['sessionstack-organization'];

        return this.service.findOne({ email: 'stbui@stbui.com' });
    }

    @ApiOperation({ summary: 'Account Settings' })
    @ApiCookieAuth()
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiBody({ type: UpdateAccountDto })
    @Put('profile')
    updateprofile(
        @Request() req,
        @Headers('authorization') authorization,
        @Body() body: UpdateAccountDto,
    ) {
        const authToken = req.cookies.authToken;
        const organization = req.cookies['sessionstack-organization'];

        return this.service.update({ email: 'stbui@stbui.com' }, body);
    }

    @ApiOperation({ summary: '当前账号所有的站点' })
    @Get('projects')
    projects() {
        return this.websiteService.findAll();
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
