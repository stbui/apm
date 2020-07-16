import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { SessionService } from './session.service';
import { SessionEntity } from './session.entity';

@ApiTags('sessions')
@Controller('sessions')
export class SessionController extends CrudController<SessionEntity> {
    constructor(protected service: SessionService) {
        super();
    }

    @ApiOperation({ summary: 'log' })
    @Get(':id/activities')
    activities_recording() {
        return { activities: [] };
    }

    @ApiOperation({ summary: '接收事件' })
    @Post(':id/data')
    data(
        @Param('sessionn_id') sessionnId,
        @Body() body,
        @Query('server_session_id') serverSessionId,
    ) {
        return [];
    }

    @ApiOperation({ summary: '说明' })
    @Post(':id/identity')
    identity(@Body() b, @Param() p) {
        return { identifier: '79deb911-198e-4265-aad4-492246beef22' };
    }

    @ApiOperation({ summary: '客户端是否在线' })
    @Put(':id/ping')
    ping(@Param('id') id, @Query('server_session_id') serverSessionId) {
        console.log('在线状态检查');

        return {};
    }

    @Put('/session/:id/server_session/:i')
    server_session() {
        return { id: '5b154cb1455b11537d0baa84' };
    }

    @Get('/sessions/:id/status')
    status(@Param('id') id) {
        return {};
    }
}
