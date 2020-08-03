import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Query,
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
    websites() {
        return [
            {
                sessionsCount: 3,
                isOwner: true,
                name: 'Yqb',
                id: 10679,
                inactiveFor: 31844.36382,
            },
            {
                sessionsCount: 0,
                isOwner: true,
                name: 'test1',
                id: 10680,
                inactiveFor: null,
            },
        ];
    }

    @ApiOperation({ summary: '说明' })
    @Get(':website_id/logs/newest')
    logs_newest() {
        return {
            log: {
                request: null,
                sessionId: '5eef8cf8f263083b88a3d79e',
                message:
                    '\u6253\u5f00 \u56fe\u62a5\u8868\u5f15\u64ce \u529f\u80fd\u8017\u65f6',
                isMessageTrimmed: false,
                level: 'info',
                time: 1592757556198,
                id: '5eef8d47342e916aa5634096',
            },
            hasPrevious: false,
            session: {
                length: 80903,
                browserName: 'Chrome',
                product: null,
                lastActive: 'Sun, 21 Jun 2020 16:39:39 GMT',
                start: 'Sun, 21 Jun 2020 16:38:16 GMT',
                regionName: null,
                ip: '112.118.176.78',
                os: 'OS X 10.14.6 64-bit',
                pageUrl: 'http://example.jepaas.com/index.html',
                id: '5eef8cf8f263083b88a3d79e',
                referrer: 'http://example.jepaas.com/index.html',
                screenWidth: 1623,
                city: 'Central District',
                country: 'China',
                layoutName: 'Blink',
                browserVersion: '83.0.4103.61',
                manufacturer: null,
                userIdentity: {
                    displayName: 'User 2',
                    customFields: [],
                    identifier: '8aa66f45-ec9f-49fa-8ede-530ce14b88ee',
                    email: null,
                },
                screenHeight: 733,
            },
            hasNext: false,
        };
    }

    @ApiOperation({ summary: '说明' })
    @Get(':website_id/logs/aggregated')
    logs_aggregated() {
        return this.service.logs_aggregated();
    }

    @ApiOperation({ summary: '说明' })
    @Get(':website_id/settings/recording')
    settings_recording() {
        return { blockedIps: [], autoStartRecording: true, targetPages: [] };
    }

    @ApiOperation({ summary: '说明' })
    @Get(':website_id/settings/notifications')
    settings_notifications() {
        return {
            notificationsDeliveryPeriod: 360,
            logLevels: ['error', 'warn'],
            ignoreList: [],
        };
    }

    @ApiOperation({ summary: '说明' })
    @Get(':website_id/settings/co_browsing')
    settings_co_browsing() {
        return { askUserForStreamingPermission: false };
    }

    @ApiOperation({ summary: '项目名称' })
    @Get(':website_id/name')
    name() {
        return { websiteName: 'apmjs' };
    }

    @ApiOperation({ summary: '团队协作' })
    @Get(':website_id/collaborators')
    collaborators() {
        return { data: [], teamMemberSeatsLeft: 2 };
    }

    @ApiOperation({ summary: '客户端JSSDK调用示例' })
    @Get(':website_id/code')
    userCode() {
        return {
            name: 'Yqb',
            identifyUsersCode:
                "apmjs.identify({\n    userId: 'USER-ID', // Replace the USER-ID with the user id from your app\n    email: 'user@example.com', // Not required\n    displayName: 'John Smith', // Not required\n\n    // Add your own custom user variables here.\n    role: 'user',\n    pricingPlan: 'free'\n});",
            code:
                '<!-- Begin apmjs code -->\n<script type="text/javascript">\n!function(a,b){var c=window;c.apmjsKey=a,c[a]=c[a]||{t:b,\nq:[]};for(var d=["start","stop","identify","getSessionId","log","setOnDataCallback"],e=0;e<d.length;e++)!function(b){\nc[a][b]=c[a][b]||function(){c[a].q.push([b].concat([].slice.call(arguments,0)));\n}}(d[e]);var f=document.createElement("script");f.async=1,f.crossOrigin="anonymous",\nf.src="https://cdn.apmjs.com/apmjs.js";var g=document.getElementsByTagName("script")[0];\ng.parentNode.insertBefore(f,g)}("apmjs","bf8813d3f71c4ef9bf851fbfc2fd0def");\n</script>\n<!-- End apmjs Code -->',
        };
    }

    @Get(':website_id/online_users')
    online_users() {
        return this.service.online_users();
    }

    @Get(':website_id/sessions')
    async sessions(@Query() query) {
        const data = await this.service.getSessionns(query);
        return {
            hasSessions: true,
            data,
            total: 4,
        };
    }

    @Get(':website_id/sessions/:session_id')
    session(@Param('session_id') session_id) {
        return this.service.getSession(session_id);
    }

    @Delete(':website_id/sessions/:session_id')
    sessionDelete(@Param('session_id') session_id) {
        return this.service.deleteSession(session_id);
    }

    @Get(':website_id/sessions/:session_id/export')
    sessionExport() {
        return this.service.findSession();
    }

    @Get(':website_id/sessions/import')
    sessionsImport() {
        return {
            session_id: '56e6a481abf649ea7e47ee84',
        };
    }

    /**
     *
     * @param body { "message": "Some error occurred", "timestamp": 1479881245380, "level": "error" }
     * level: debug, info, warn, error
     */
    @Post(':website_id/sessions/:session_id/logs')
    sessionLogs(@Body() body) {
        return this.service.findSession();
    }

    @Get(':website_id/sessions/:session_id/events/mouse_click')
    sessionEventsMouseClick() {
        return {
            data: [
                {
                    timestamp: 1457721477.072,
                    left: 702.0,
                    top: 279.0,
                },
                {
                    timestamp: 1457721476.715,
                    left: 205.0,
                    top: 179.0,
                },
            ],
        };
    }

    @Get(':website_id/sessions/:session_id/events/mouse_move')
    sessionEventsMouseMove() {
        return {
            data: [
                {
                    timestamp: 1457721477.072,
                    left: 702.0,
                    top: 279.0,
                },
                {
                    timestamp: 1457721476.715,
                    left: 205.0,
                    top: 179.0,
                },
            ],
        };
    }

    @Get(':website_id/sessions/:session_id/events/scroll')
    sessionEventsMouseScroll() {
        return {
            data: [
                {
                    timestamp: 1457721477.072,
                    left: 702.0,
                    top: 279.0,
                },
                {
                    timestamp: 1457721476.715,
                    left: 205.0,
                    top: 179.0,
                },
            ],
        };
    }

    @Get(':website_id/sessions/:session_id/events/window_resize')
    sessionEventsMouseWindowResize() {
        return {
            data: [
                {
                    timestamp: 1457966185.622,
                    height: 534,
                    width: 965,
                },
                {
                    timestamp: 1457966185.603,
                    height: 530,
                    width: 987,
                },
            ],
        };
    }

    @Get(':website_id/sessions/:session_id/events/location_path_change')
    sessionEventsLocationPathChange() {
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
