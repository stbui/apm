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

    @Get()
    settings() {
        return {
            website: {
                autoLogErrors: 1,
                autoStartRecording: 1,
                sensitiveInputFields: 0,
                autoLogNetworkRequests: 'failed',
                autoLogConsoleLog: 1,
                autoLogConsoleError: 1,
                autoLogConsoleWarn: 1,
                autoLogConsoleInfo: 1,
                autoLogConsoleDebug: 1,
                maxLogMessageLength: 1000,
                storeStaticResources: 1,
                origin: null,
                isToolkitEnabled: 1,
                captureMetadataOnly: 1,
                isControlTakeoverEnabled: 1,
                maxNodesCount: null,
                liveSessionsEnabled: 1,
                inactivityThreshold: 1800000,
                sensitiveElementsSelector: '',
                shouldRecordPage: true,
            },
            session: {
                maxSessionInactivityMinutes: 1,
                isActive: true,
                hasEvents: true,
                sensitiveInputFields: false,
                sessionId: '5eddfe31d0308854dcd1f267',
            },
            mappings: {
                lastActive: 'la',
                logs: 'lg',
                network_request: 'nr',
                console_debug: 'cd',
                console_error: 'ce',
                console_warn: 'cw',
                console_log: 'cl',
                full_screen_leave: 'fsl',
                full_screen_enter: 'fse',
                adopted_style_sheet_change: 'assc',
                css_rule_delete: 'crd',
                css_rule_insert: 'cri',
                url_change: 'uc',
                visibility_change: 'vc',
                checkbox_change: 'cbc',
                radio_button_change: 'rbc',
                scroll_position_change: 'spc',
                dom_snapshot: 'ds',
                window_resize: 'wr',
                mouse_out: 'mou',
                mouse_over: 'mov',
                mouse_click: 'mc',
                mouse_move: 'mm',
                dom_mutation: 'dm',
                dom_element_value_change: 'evc',
            },
        };
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

    @Get(':session_id/logs')
    logs(@Param('session_id') session_id) {
        return this.service.logs(session_id);
    }
}
