import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { WebsiteService } from './website.service';
import { WebsiteEntity } from './website.entity';

@ApiUseTags('website')
@Controller('website')
export class WebsiteController extends CrudController<WebsiteEntity> {
    constructor(protected service: WebsiteService) {
        super();
    }

    @Get(':website_id/online_users')
    online_users() {
        return { hasSessions: true, total: 0, data: [] };
    }

    @Get(':website_id/sessions')
    sessions() {
        return this.service.getSessionns();
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
