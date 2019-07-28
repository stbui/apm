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

    getSessionns() {
        return this.sessionService.find();
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
}
