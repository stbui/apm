import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { WebsiteEntity } from './website.entity';
import { LogsEntity } from './logs.entity';
import { WEBSITE_TOKEN, LogsRepositoryToken } from './website.constants';
import { SessionService } from '../session/session.service';

@Injectable()
export class WebsiteService extends CrudService<WebsiteEntity> {
    constructor(
        @Inject(WEBSITE_TOKEN)
        protected readonly repository: Repository<WebsiteEntity>,
        @Inject(LogsRepositoryToken)
        protected readonly logsService: Repository<LogsEntity>,
        protected readonly sessionService: SessionService,
    ) {
        super();
    }

    getSessions(options?) {
        return this.sessionService.findAll(options);
    }
    getSession(website_id, id) {
        return this.sessionService.findOneById(id);
    }
    deleteSession(website_id, id) {
        return this.sessionService.delete(id);
    }

    findSessionLogs(website_id, sessionId) {
        return this.sessionService.logs(sessionId);
    }

    events_mouse_click(website_id, session_id) {
        return this.sessionService.events_mouse_click(website_id, session_id);
    }

    events_mouse_move(website_id, session_id) {
        return this.sessionService.events_mouse_move(website_id, session_id);
    }

    events_scroll(website_id, session_id) {
        return this.sessionService.events_scroll(website_id, session_id);
    }

    events_window_resize(website_id, session_id) {
        return this.sessionService.events_window_resize(website_id, session_id);
    }

    exportSesson(website_id) {
        return {
            session_id: '56e6a481abf649ea7e47ee84',
        };
    }
    exportSessonsById(website_id, session_id) {}

    online_users(options?) {
        return this.sessionService.findAll(options);

        // return {
        //     data: [
        //         {
        //             country: 'China',
        //             pageUrl: 'http://localhost:4200/',
        //             top: null,
        //             clientStartMilliseconds: null,
        //             os: 'OS X 10.14.6 64-bit',
        //             regionName: null,
        //             browserName: 'Chrome',
        //             origin: null,
        //             screenHeight: 916,
        //             browserVersion: '83.0.4103.61',
        //             layoutName: 'Blink',
        //             isLive: true,
        //             ip: '127.0.0.1',
        //             visibilityState: null,
        //             id: '5ef01188b3c730061d03eb0e',
        //             manufacturer: null,
        //             referrer: null,
        //             length: 119451,
        //             hasInaccessibleResources: true,
        //             userIdentity: {
        //                 displayName: 'User 3',
        //                 identifier: '56f518a3-fbfa-4f15-8f85-6b4ac3844345',
        //                 customFields: [],
        //                 email: null,
        //             },
        //             left: null,
        //             version: null,
        //             isWatched: false,
        //             screenWidth: 1623,
        //             lastActive: 1592791547955.0,
        //             product: null,
        //             start: 1592791432458.0,
        //             city: 'Central District',
        //         },
        //     ],
        //     hasSessions: true,
        //     total: 1,
        // };
    }

    createLogs(entity) {
        return this.logsService.create(entity);
    }

    logs_aggregated(options) {
        return this.logsService.findAndCount(options);
    }

    async logs_newest(websiteId: string, query) {
        const log = await this.logsService.findOne(
            { websiteId },
            {
                select: [
                    'request',
                    'sessionId',
                    'message',
                    'level',
                    'isMessageTrimmed',
                    'time',
                ],
            },
        );

        // bug: 找出Events中的session
        // time: query.fromDate, level: query.level
        const session = await this.sessionService.findOne({
            websiteId,
            start: query.fromDate,
        });

        return {
            log,
            session,
            hasPrevious: false,
            hasNext: false,
        };
    }

    async userCode(websiteId: string) {
        const res = await this.findOneById(websiteId);

        const id = res.access_tokens;
        const userId = '1';
        const email = 'user@example.com';
        const displayName = 'stbui';
        const name = res.name;

        return {
            name,
            identifyUsersCode: `SessionStack.identify({\n    userId: '${userId}', // 将userId替换为用户ID\n    email: '${email}', // 可选\n    displayName: '${displayName}', // 可选\n\n    // 这里可以添加自定义变量.\n    role: 'user',\n    pricingPlan: 'free'\n});`,
            code: `<!-- Begin code -->
<script type="text/javascript">\n!function(a,b){var c=window;c.SessionStackKey=a,c[a]=c[a]||{t:b,\nq:[]};for(var d=["start","stop","identify","getSessionId","log","setOnDataCallback"],e=0;e<d.length;e++)!function(b){\nc[a][b]=c[a][b]||function(){c[a].q.push([b].concat([].slice.call(arguments,0)));\n}}(d[e]);var f=document.createElement("script");f.async=1,f.crossOrigin="anonymous",\nf.src="https://cdn.stbui.com/apmjs.js";var g=document.getElementsByTagName("script")[0];\ng.parentNode.insertBefore(f,g)}("SessionStack","${id}");\n</script>
<!-- End Code -->`,
        };
    }
}
