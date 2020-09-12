import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { SessionEntity } from './session.entity';
import { TOKEN } from './session.constants';

@Injectable()
export class SessionService extends CrudService<SessionEntity> {
    constructor(
        @Inject(TOKEN)
        protected readonly repository: Repository<SessionEntity>,
    ) {
        super();
    }

    async logs(sessionId) {
        const res = await this.findOneById(sessionId);
        res.start;

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

    events_mouse_click(website_id, session_id) {
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

    events_mouse_move(website_id, session_id) {
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

    events_scroll(website_id, session_id) {
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

    events_window_resize(website_id, session_id) {
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
}
