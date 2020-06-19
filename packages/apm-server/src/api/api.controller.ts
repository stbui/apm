import {
    Controller,
    Get,
    Query,
    Post,
    Body,
    Param,
    Put,
    Headers,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    timestamp: number;
    clientOnline: boolean = true;
    clientUnOnlineTimer: NodeJS.Timer;

    constructor(private service: ApiService) {}

    /**
     * 播放页面
     * ?with_last_activity_index=true
     */
    @Get('/sessions/:id')
    async sessions(@Param('id') id) {
        const session = await this.service.getSession(id);

        return {
            log: null,
            session: session,
            customOrigin: null,
            askUserForStreamingPermission: false,
            lastActivityIndex: 83,
        };
    }

    // 播放列表
    /**
     *
     * @param session_id
     * @param q
     * ?events_index=-1&events_timestamp=-1&logs_timestamp=0
     * ?events_index=2&events_timestamp=1495539033675&logs_timestamp=1495539033246
     */
    @Get('/sessions/:session_id/activities')
    async activities(
        @Param('session_id') sessionId,
        @Query('events_index', new ParseIntPipe()) eventsIndex,
    ) {
        const activities = await this.service.getEvents(sessionId, eventsIndex);
        const session = await this.service.getSession(sessionId);

        const result = {
            activities: activities,
            lastEventIndex: eventsIndex + 1,
            // 最后记录时间
            lastEventTimestamp: session.lastActive,
            offset: 0,
        };

        return result;
    }

    // 建立页面快照
    @Post('/session')
    async session(@Body() body, @Headers('authorization') accessToken) {
        const data = {
            docType: body.docType,
            left: body.left,
            origin: body.origin,
            pageUrl: body.pageUrl,
            referrer: body.referrer,
            screenWidth: body.screenWidth,
            top: body.top,
            visibilityState: body.visibilityState,
            snapshot: body.snapshot,
        };

        const session = {
            ...body,
            start: body.timestamp,
            clientStartMilliseconds: body.timestamp,
        };
        const result = await this.service.saveSession(session);

        const model = {
            data,
            index: 0,
            time: -1,
            timestamp: body.timestamp,
            type: 'dom_snapshot',
            serverSessionId: result.id + '',
        };

        await this.service.createSnapshot(model);
        const mappings = this.service.findMappings();

        return {
            id: result.id,
            mappings,
            serverSessionId: 1,
            nr: false,
        };
    }

    // 配置字段
    @Get('/settings')
    async settings(@Query() q, @Headers('authorization') accessToken) {
        // const website = await this.service.findWebsite(
        //     '5d3d95106e562d4d018e8a38',
        // );

        const mappings = this.service.findMappings();

        return {
            website: {
                autoLogErrors: 1,
                autoStartRecording: 1,
                sensitiveInputFields: 0,
                autoLogFailedNetworkRequests: 1,
                autoLogConsoleLog: 1,
                autoLogConsoleError: 1,
                autoLogConsoleWarn: 1,
                autoLogConsoleInfo: 1,
                autoLogConsoleDebug: 1,
                maxLogMessageLength: 1000,
                storeStaticResources: 1,
                origin: null,
                sensitiveElementsSelector: '',
                shouldRecordPage: true,
            },
            session: {
                isActive: false,
                sessionId: q.session_id,
                hasEvents: false,
                maxSessionInactivityMinutes: 1,
            },
            mappings,
        };
    }

    /**
     * 实时接收dom变化数据
     * @param sessionn_id
     * @param b
     * @param serverSessionId
     */
    @Post('/session/:sessionn_id/data')
    async data(
        @Param('sessionn_id') sessionnId,
        @Body() body,
        @Query('server_session_id') serverSessionId,
    ) {
        let { lastActive, sessions } = this.service.convertMappings(body);
        const se = await this.service.getSession(sessionnId);

        let newSessions = sessions.map((session, index) => {
            const data = {
                ...session,
                data: session.data,
                time: session.timestamp - se.timestamp,
                serverSessionId: sessionnId,
            };

            this.service.createSnapshot(data);
            return data;
        });

        this.service.updateSession(sessionnId, {
            lastActive: lastActive,
            length: newSessions[newSessions.length - 1].time,
        });

        return newSessions;
    }

    @Post('/session/:id/identity')
    async identity(@Body() b, @Param() p) {
        return { identifier: '79deb911-198e-4265-aad4-492246beef22' };
    }

    // 客户端与服务端是否同时在线
    // server_session_id
    @Put('/session/:id/ping')
    ping(@Param('id') id, @Query('server_session_id') serverSessionId) {
        console.log('在线状态检查');
        this.clientOnline = true;
        return {};
    }

    @Put('/session/:id/server_session/:i')
    server_session() {
        return { id: '5b154cb1455b11537d0baa84' };
    }

    @Get('/sessions/:id/status')
    async status(@Param('id') id) {
        // const result = await this.snapshotService.findById(id);
        // const { isLive, length } = result;
        return {};
    }

    //
    @Get('/features/:id')
    features(@Param('id') id) {
        return {
            isAssureCoWorkaroundEnabled: false,
            isToolkitEnabled: true,
            isControlTakeoverEnabled: true,
            ignoreFormsAutofill: false,
            captureMetadataOnly: true,
        };
    }
    //
    @Post('/analytics/sessions/:id')
    analytics(@Param('id') id) {
        return {};
    }
}
