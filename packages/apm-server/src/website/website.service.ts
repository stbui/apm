import { Injectable, Inject } from '@nestjs/common';
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

    getSessions(website_id, options?) {
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

    online_users(website_id) {
        return {
            data: [
                {
                    country: 'China',
                    pageUrl: 'http://localhost:4200/',
                    top: null,
                    clientStartMilliseconds: null,
                    os: 'OS X 10.14.6 64-bit',
                    regionName: null,
                    browserName: 'Chrome',
                    origin: null,
                    screenHeight: 916,
                    browserVersion: '83.0.4103.61',
                    layoutName: 'Blink',
                    isLive: true,
                    ip: '127.0.0.1',
                    visibilityState: null,
                    id: '5ef01188b3c730061d03eb0e',
                    manufacturer: null,
                    referrer: null,
                    length: 119451,
                    hasInaccessibleResources: true,
                    userIdentity: {
                        displayName: 'User 3',
                        identifier: '56f518a3-fbfa-4f15-8f85-6b4ac3844345',
                        customFields: [],
                        email: null,
                    },
                    left: null,
                    version: null,
                    isWatched: false,
                    screenWidth: 1623,
                    lastActive: 1592791547955.0,
                    product: null,
                    start: 1592791432458.0,
                    city: 'Central District',
                },
            ],
            hasSessions: true,
            total: 1,
        };
    }

    createLogs(entity) {
        return this.logsService.create(entity);
    }

    async logs_aggregated(websiteId: string) {
        const [data, total] = await this.logsService.findAndCount({
            where: { sessionId: websiteId },
            select: [
                'message',
                'level',
                'usersAffected',
                'firstOccurrence',
                'lastOccurrence',
                'totalOccurrences',
            ],
        });

        // {
        //     message: ':',
        //     level: 'info',
        //     usersAffected: 1,
        //     firstOccurrence: 1592757344110,
        //     lastOccurrence: 1592757556198,
        //     totalOccurrences: 12,
        // }

        return {
            data: data,
            total: total,
            hasLogs: true,
        };
    }

    async logs_newest(websiteId: string) {
        const session = await this.sessionService.findOneById(websiteId);
        const log = await this.logsService.findOneOrFail(websiteId);

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

    async userCode(websiteId: string) {
        const res = await this.findOneById(websiteId);

        return {
            name: res.name,
            identifyUsersCode:
                "apmjs.identify({\n    userId: 'USER-ID', // Replace the USER-ID with the user id from your app\n    email: 'user@example.com', // Not required\n    displayName: 'John Smith', // Not required\n\n    // Add your own custom user variables here.\n    role: 'user',\n    pricingPlan: 'free'\n});",
            code:
                '<!-- Begin apmjs code -->\n<script type="text/javascript">\n!function(a,b){var c=window;c.apmjsKey=a,c[a]=c[a]||{t:b,\nq:[]};for(var d=["start","stop","identify","getSessionId","log","setOnDataCallback"],e=0;e<d.length;e++)!function(b){\nc[a][b]=c[a][b]||function(){c[a].q.push([b].concat([].slice.call(arguments,0)));\n}}(d[e]);var f=document.createElement("script");f.async=1,f.crossOrigin="anonymous",\nf.src="https://cdn.apmjs.com/apmjs.js";var g=document.getElementsByTagName("script")[0];\ng.parentNode.insertBefore(f,g)}("apmjs","bf8813d3f71c4ef9bf851fbfc2fd0def");\n</script>\n<!-- End apmjs Code -->',
        };
    }
}
