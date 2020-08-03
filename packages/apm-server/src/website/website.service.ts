import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { WebsiteEntity } from './website.entity';
import { WEBSITE_TOKEN } from './website.constants';
import { SessionService } from '../session/session.service';

@Injectable()
export class WebsiteService extends CrudService<WebsiteEntity> {
    constructor(
        @Inject(WEBSITE_TOKEN)
        protected readonly repository: Repository<WebsiteEntity>,
        protected readonly sessionService: SessionService,
    ) {
        super();
    }

    getSessionns(options?) {
        return this.sessionService.find(options);
    }
    getSession(id) {
        return this.sessionService.findOneById(id);
    }
    deleteSession(id) {
        return this.sessionService.delete(id);
    }

    findSession() {
        return {
            id: '56e6a481abf649ea7e47ee84',
            start: 1457956056.163,
            device: {
                browser_name: 'Chrome Mobile',
                browser_version: '49.0.2623.73',
                os: 'iOS 9.2.1',
                manufacturer: 'Apple',
            },
            location: {
                country: 'United Kingdom',
                city: 'London',
                ip: '52.29.121.148',
            },
            initial_state: {
                window_width: 1920.0,
                window_height: 973.0,
                page_url: 'http://www.example.com/',
            },
            logs: [
                {
                    timestamp: 1457956476.163,
                    message:
                        'Uncaught ReferenceError: functionName3 is not defined',
                },
            ],
        };
    }

    online_users() {
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

    logs_aggregated() {
        return {
            data: [
                {
                    message: ':',
                    level: 'info',
                    usersAffected: 1,
                    firstOccurrence: 1592757344110,
                    lastOccurrence: 1592757556198,
                    totalOccurrences: 12,
                },
                {
                    message: '\u79d2',
                    level: 'info',
                    usersAffected: 1,
                    firstOccurrence: 1592757344110,
                    lastOccurrence: 1592757556198,
                    totalOccurrences: 12,
                },
                {
                    message: '0.043',
                    level: 'info',
                    usersAffected: 1,
                    firstOccurrence: 1592757556198,
                    lastOccurrence: 1592757556198,
                    totalOccurrences: 1,
                },
                {
                    message:
                        '\u6253\u5f00 \u56fe\u62a5\u8868\u5f15\u64ce \u529f\u80fd\u8017\u65f6',
                    level: 'info',
                    usersAffected: 1,
                    firstOccurrence: 1592757556198,
                    lastOccurrence: 1592757556198,
                    totalOccurrences: 1,
                },
                {
                    message: '0.133',
                    level: 'info',
                    usersAffected: 1,
                    firstOccurrence: 1592757490201,
                    lastOccurrence: 1592757490201,
                    totalOccurrences: 1,
                },
                {
                    message:
                        '\u6253\u5f00 \u5de5\u4f5c\u6d41\u5f15\u64ce(JE_CORE_PROCESSINFO) \u529f\u80fd\u8017\u65f6',
                    level: 'info',
                    usersAffected: 1,
                    firstOccurrence: 1592757490201,
                    lastOccurrence: 1592757490201,
                    totalOccurrences: 1,
                },
                {
                    message:
                        '\u5de5\u4f5c\u6d41\u90e8\u7f72\u3010JE_CORE_PROCESSINFO\u3011\u8017\u65f6',
                    level: 'info',
                    usersAffected: 1,
                    firstOccurrence: 1592757490084,
                    lastOccurrence: 1592757490101,
                    totalOccurrences: 2,
                },
                {
                    message: '0.004',
                    level: 'info',
                    usersAffected: 1,
                    firstOccurrence: 1592757490084,
                    lastOccurrence: 1592757490101,
                    totalOccurrences: 2,
                },
                {
                    message: '0.044',
                    level: 'info',
                    usersAffected: 1,
                    firstOccurrence: 1592757487362,
                    lastOccurrence: 1592757487362,
                    totalOccurrences: 1,
                },
                {
                    message:
                        '\u6253\u5f00 \u83dc\u5355\u7ef4\u62a4 \u529f\u80fd\u8017\u65f6',
                    level: 'info',
                    usersAffected: 1,
                    firstOccurrence: 1592757487362,
                    lastOccurrence: 1592757487362,
                    totalOccurrences: 1,
                },
            ],
            total: 42,
            hasLogs: true,
        };
    }
}
