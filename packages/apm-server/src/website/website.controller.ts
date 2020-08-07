import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Query,
    Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { WebsiteService } from './website.service';
import { WebsiteEntity } from './website.entity';

@ApiTags('api/websites')
@Controller('api/websites')
export class WebsiteController extends CrudController<WebsiteEntity> {
    constructor(protected service: WebsiteService) {
        super();
    }

    @Get()
    list() {
        return this.service.find();
    }

    @Get('cancreate')
    cancreate() {
        return {};
    }

    // @Get()
    // websites() {
    //     return [
    //         {
    //             sessionsCount: 3,
    //             isOwner: true,
    //             name: 'Yqb',
    //             id: 10679,
    //             inactiveFor: 31844.36382,
    //         },
    //         {
    //             sessionsCount: 0,
    //             isOwner: true,
    //             name: 'test1',
    //             id: 10680,
    //             inactiveFor: null,
    //         },
    //     ];
    // }

    @ApiOperation({ summary: '项目名称' })
    @Get(':website_id/name')
    async name(@Param('website_id') website_id) {
        const res = await this.service.findOneById(website_id);
        return { websiteName: res.name };
    }

    @ApiOperation({ summary: '说明' })
    @Get(':website_id/logs/newest')
    logs_newest(@Param('website_id') website_id) {
        return this.service.logs_newest(website_id);
    }

    @ApiOperation({ summary: '说明' })
    @Get(':website_id/logs/aggregated')
    logs_aggregated(@Param('website_id') website_id) {
        return this.service.logs_aggregated(website_id);
    }

    @ApiOperation({ summary: '说明' })
    @Get(':website_id/settings/recording')
    settings_recording(@Param('website_id') website_id) {
        return {
            blockedIps: [{ name: 'name', ip: 'ip' }],
            autoStartRecording: true,
            targetPages: [
                {
                    matchingMethod: 'simple_match',
                    value: 1,
                },
            ],
        };
    }

    @ApiOperation({ summary: 'Recording' })
    @Put(':website_id/settings/recording')
    settings_recording_update(@Param('website_id') website_id, @Body() body) {
        return {
            blockedIps: [{ name: 'name', ip: 'ip' }],
            autoStartRecording: true,
            targetPages: [
                {
                    matchingMethod: 'simple_match',
                    value: 1,
                },
            ],
        };
    }

    @ApiOperation({ summary: 'Notifications' })
    @Get(':website_id/settings/notifications')
    settings_notifications(@Param('website_id') website_id, @Body() body) {
        return {
            notificationsDeliveryPeriod: 360,
            logLevels: ['error', 'warn'],
            ignoreList: [],
        };
    }

    @ApiOperation({ summary: 'Notifications' })
    @Put(':website_id/settings/notifications')
    settings_notifications_update(
        @Param('website_id') website_id,
        @Body() body,
    ) {
        return {
            notificationsDeliveryPeriod: 360,
            logLevels: ['error', 'warn'],
            ignoreList: [],
        };
    }

    @ApiOperation({ summary: '说明' })
    @Get(':website_id/settings/co_browsing')
    settings_co_browsing(@Param('website_id') website_id) {
        return { askUserForStreamingPermission: false };
    }

    @ApiOperation({ summary: '说明' })
    @Put(':website_id/settings/co_browsing')
    settings_co_browsing_update(@Param('website_id') website_id, @Body() body) {
        return { askUserForStreamingPermission: false };
    }

    @ApiOperation({ summary: '团队协作' })
    @Get(':website_id/collaborators')
    collaborators(@Param('website_id') website_id) {
        return { data: [], teamMemberSeatsLeft: 2 };
    }

    @ApiOperation({ summary: '客户端JSSDK调用示例' })
    @Get(':website_id/code')
    userCode(@Param('website_id') website_id: string) {
        return this.service.userCode(website_id);
    }

    @Get(':website_id/online_users')
    async online_users(@Param('website_id') website_id, @Query() query) {
        const [data, total] = await this.service.online_users({
            take: query.take,
            skip: parseInt(query.skip),
            where: { isLive: true, websiteId: website_id },
        });

        return {
            hasSessions: true,
            data: data,
            total: total,
        };
    }

    @Get(':website_id/sessions')
    async sessions(@Param('website_id') website_id, @Query() query) {
        // websiteId->sessionId
        const [result, total] = await this.service.getSessions({
            take: query.take,
            skip: parseInt(query.skip),
            where: { websiteId: website_id },
        });

        return {
            hasSessions: true,
            data: result,
            total: total,
        };
    }

    @Get(':website_id/sessions/:session_id')
    session(@Param('website_id') website_id, @Param('session_id') session_id) {
        // websiteId->sessionId
        return this.service.getSession(website_id, session_id);
    }

    @Delete(':website_id/sessions/:session_id')
    sessionDelete(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
    ) {
        return this.service.deleteSession(website_id, session_id);
    }

    @Get(':website_id/sessions/:session_id/export')
    sessionExport(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
    ) {
        return this.service.exportSessonsById(website_id, session_id);
    }

    @Get(':website_id/sessions/import')
    sessionsImport(@Param('website_id') website_id) {
        return this.service.exportSesson(website_id);
    }

    /**
     *
     * @param body { "message": "Some error occurred", "timestamp": 1479881245380, "level": "error" }
     * level: debug, info, warn, error
     */
    @Post(':website_id/sessions/:session_id/logs')
    sessionLogs(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
        @Body() body,
    ) {
        return this.service.findSessionLogs(website_id, session_id);
    }

    @Get(':website_id/sessions/:session_id/events/mouse_click')
    sessionEventsMouseClick(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
    ) {
        return this.service.events_mouse_click(website_id, session_id);
    }

    @Get(':website_id/sessions/:session_id/events/mouse_move')
    sessionEventsMouseMove(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
    ) {
        return this.service.events_mouse_move(website_id, session_id);
    }

    @Get(':website_id/sessions/:session_id/events/scroll')
    sessionEventsMouseScroll(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
    ) {
        return this.service.events_scroll(website_id, session_id);
    }

    @Get(':website_id/sessions/:session_id/events/window_resize')
    sessionEventsMouseWindowResize(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
    ) {
        return this.service.events_window_resize(website_id, session_id);
    }

    @Get(':website_id/sessions/:session_id/events/location_path_change')
    sessionEventsLocationPathChange(@Param('website_id') website_id) {
        return {
            data: [
                {
                    timestamp: 1457966191.549,
                    page_url: 'http://example.com/page2',
                },
                {
                    timestamp: 1457966194.296,
                    page_url: 'http://example.com/page3',
                },
            ],
        };
    }
}
