import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Query,
    Put,
    Headers,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiQuery,
    ApiParam,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { WebsiteService } from './website.service';
import { WebsiteEntity } from './website.entity';
import { v4 as uuidv4 } from 'uuid';

@ApiBearerAuth()
@ApiTags('api/websites')
@Controller('api/websites')
export class WebsiteController extends CrudController<WebsiteEntity> {
    constructor(protected service: WebsiteService) {
        super();
    }

    @Get()
    list(@Headers('authorization') authorization) {
        console.log(authorization);
        return this.service.find();
    }

    @Post()
    public async create(@Body() data: object): Promise<any> {
        return this.service.create({
            ...data,
            access_tokens: uuidv4().split('-').join(''),
        });
    }

    @ApiOperation({ summary: '名称是否存在' })
    @Get('cancreate')
    cancreate() {
        return {};
    }

    @ApiOperation({ summary: '项目名称' })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
    @Get(':website_id/name')
    async name(@Param('website_id') website_id) {
        const res = await this.service.findOneById(website_id);
        return { websiteName: res.name };
    }

    @ApiOperation({ summary: '说明' })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
    @Get(':website_id/logs/newest')
    logs_newest(@Param('website_id') website_id) {
        return this.service.logs_newest(website_id);
    }

    @ApiOperation({ summary: '说明' })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
    @Get(':website_id/logs/aggregated')
    logs_aggregated(@Param('website_id') website_id) {
        return this.service.logs_aggregated(website_id);
    }

    @ApiOperation({ summary: '说明' })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
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
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
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
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
    @Get(':website_id/settings/notifications')
    settings_notifications(@Param('website_id') website_id, @Body() body) {
        return {
            notificationsDeliveryPeriod: 360,
            logLevels: ['error', 'warn'],
            ignoreList: [],
        };
    }

    @ApiOperation({ summary: 'Notifications' })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
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
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
    @Get(':website_id/settings/co_browsing')
    settings_co_browsing(@Param('website_id') website_id) {
        return { askUserForStreamingPermission: false };
    }

    @ApiOperation({ summary: '说明' })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
    @Put(':website_id/settings/co_browsing')
    settings_co_browsing_update(@Param('website_id') website_id, @Body() body) {
        return { askUserForStreamingPermission: false };
    }

    @ApiOperation({ summary: '团队协作' })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
    @Get(':website_id/collaborators')
    collaborators(@Param('website_id') website_id) {
        return { data: [], teamMemberSeatsLeft: 2 };
    }

    @ApiOperation({ summary: '客户端JSSDK调用示例' })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
    @Get(':website_id/code')
    userCode(@Param('website_id') website_id: string) {
        return this.service.userCode(website_id);
    }

    /**
     * 当前在线用户列表
     */
    @ApiOperation({ summary: '当前在线用户列表' })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
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

    @ApiOperation({
        summary: '获取sessions列表',
        description:
            'Retrieve and search for sessions associated with your websites sorted by their start time.',
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: String,
        description:
            'The maximum number of sessions to return in one response. If not present, only the first 10 sessions that match the query will be returned.',
    })
    @ApiQuery({
        name: 'skip',
        required: false,
        type: String,
        description:
            'The number of sessions to be skipped before retrieving the result. If not present, all sessions from the beginning will be returned.',
    })
    @ApiQuery({
        name: 'search',
        required: false,
        type: String,
        description:
            'If present the resulting sessions will match this search query. Read the Sessions Search section for more details.',
    })
    @ApiQuery({
        name: 'sort',
        required: false,
        type: String,
        description:
            'Name of a filed, which will be used for sorting. The allowed values are: start, last_active, length, browser_name, os.',
    })
    @ApiQuery({
        name: 'order',
        required: false,
        type: String,
        description: 'The sorting order. The allowed values are: asc, desc.',
    })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: 'Id of a website, associated with your account.',
    })
    @Get(':website_id/sessions')
    async sessions(@Param('website_id') websiteId, @Query() query) {
        const website = await this.service.findOneById(websiteId);

        const [result, total] = await this.service.getSessions({
            take: query.take,
            skip: parseInt(query.skip),
            where: { accessToken: website.access_tokens },
        });

        return {
            hasSessions: true,
            data: result,
            total: total,
        };
    }

    @ApiOperation({
        description: 'Retrieve information about an individual session.',
    })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: 'Id of a website, associated with your account.',
    })
    @ApiParam({
        name: 'session_id',
        required: true,
        type: String,
        description: '站点id',
    })
    @Get(':website_id/sessions/:session_id')
    session(@Param('website_id') website_id, @Param('session_id') session_id) {
        // websiteId->sessionId
        return this.service.getSession(website_id, session_id);
    }

    @ApiOperation({
        description: 'Deleting an Individual Session.',
    })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: 'Id of a website, associated with your account.',
    })
    @Delete(':website_id/sessions/:session_id')
    sessionDelete(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
    ) {
        return this.service.deleteSession(website_id, session_id);
    }

    @ApiOperation({
        description:
            'Export all data for a session either as JSON (default) or HTML file. The exported session in JSON format will contain only the data for the given session. The exported session in HTML format will also contain an embedded player which will allow replaying the session offline.',
    })
    @Get(':website_id/sessions/:session_id/export')
    sessionExport(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
    ) {
        return this.service.exportSessonsById(website_id, session_id);
    }

    @ApiOperation({
        description:
            'Import a session from previously exported session as JSON.',
    })
    @Get(':website_id/sessions/import')
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
        description: '站点id',
    })
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

    // ----------------------------------------------------------------
    // EVENT
    // With the provided REST APIs, you can retrieve information about events in your sessions.
    // ----------------------------------------------------------------

    @ApiOperation({
        description:
            'Retrieve information about mouse clicks during the session.',
    })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
    })
    @ApiParam({
        name: 'session_id',
        required: true,
        type: String,
    })
    @Get(':website_id/sessions/:session_id/events/mouse_click')
    sessionEventsMouseClick(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
    ) {
        return this.service.events_mouse_click(website_id, session_id);
    }

    @ApiOperation({
        description:
            'Retrieve information about mouse moves during the session.',
    })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
    })
    @ApiParam({
        name: 'session_id',
        required: true,
        type: String,
    })
    @Get(':website_id/sessions/:session_id/events/mouse_move')
    sessionEventsMouseMove(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
    ) {
        return this.service.events_mouse_move(website_id, session_id);
    }

    @ApiOperation({
        description: 'Retrieve information about scrolling during the session.',
    })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
    })
    @ApiParam({
        name: 'session_id',
        required: true,
        type: String,
    })
    @Get(':website_id/sessions/:session_id/events/scroll')
    sessionEventsMouseScroll(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
    ) {
        return this.service.events_scroll(website_id, session_id);
    }

    @ApiOperation({
        description:
            'Retrieve information about browser window resizes during the session.',
    })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
    })
    @ApiParam({
        name: 'session_id',
        required: true,
        type: String,
    })
    @Get(':website_id/sessions/:session_id/events/window_resize')
    sessionEventsMouseWindowResize(
        @Param('website_id') website_id,
        @Param('session_id') session_id,
    ) {
        return this.service.events_window_resize(website_id, session_id);
    }

    @ApiOperation({
        description:
            'Retrieve information about browser window resizes during the session.',
    })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
    })
    @ApiParam({
        name: 'session_id',
        required: true,
        type: String,
    })
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

    // "headers": {
    //     "Authorization": "Basic " + btoa("user@example.com:d4ee759a2c1d4fa5ab789018f1d4b802")
    // },
    @ApiOperation({
        description:
            'Delete an access token for a session to make the session inaccessible through the URL with the given token.',
    })
    @ApiParam({
        name: 'website_id',
        required: true,
        type: String,
    })
    @ApiParam({
        name: 'session_id',
        required: true,
        type: String,
    })
    @Get(':website_id/sessions/:session_id/access_tokens/:access_token_id')
    delete_website_session_access_tokens(@Param('website_id') website_id) {
        return {};
    }
}
