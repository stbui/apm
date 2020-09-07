import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Headers,
    Query,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ApiService } from './api.service';
import { SessionService } from '../session/session.service';
import { SnapshotService } from '../snapshot/snapshot.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { UsersService } from '../users/users.service';
import { WebsiteService } from '../website/website.service';

@Controller('api')
export class ApiController {
    timestamp: number;
    clientOnline: boolean = true;
    clientUnOnlineTimer: NodeJS.Timer;

    constructor(
        private service: ApiService,
        private readonly sessionService: SessionService,
        private readonly snapshotService: SnapshotService,
        private readonly subscriptionService: SubscriptionService,
        private readonly usersService: UsersService,
        private readonly websiteService: WebsiteService,
    ) {}

    /**
     * 建立页面快照
     * @param body
     * @param websiteId
     */
    @Post('/session')
    async updateSession(@Body() body, @Headers('authorization') accessToken) {
        const website = await this.websiteService.findOne({
            access_tokens: accessToken,
        });

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
            accessToken: accessToken,
            websiteId: website.id,
        };

        const sessionModel = {
            ...body,
            start: body.timestamp,
            clientStartMilliseconds: body.timestamp,
            accessToken: accessToken,
            websiteId: website.id,
        };

        //
        const session = await this.sessionService.create(sessionModel);

        const model = {
            data,
            index: 0,
            time: -1,
            timestamp: body.timestamp,
            type: 'dom_snapshot',
            sessionId: session.id,
            accessToken: accessToken,
            websiteId: website.id,
        };

        await this.snapshotService.insertMany(model);
        const mappings = this.service.findMappings();

        return {
            id: session.id,
            mappings,
            nr: false,
        };
    }

    /**
     * 实时接收dom变化数据
     * ?batch_id=125&tab_id=1596770000471
     * ?batch_id=137&tab_id=1596770000471
     */
    @Post('/session/:session_id/data')
    async data(
        @Param('session_id') sessionId,
        @Headers('authorization') accessToken,
        @Body() body,
        @Query() query,
    ) {
        // 客户端在推送事件
        this.clientOnline = true;

        clearInterval(this.clientUnOnlineTimer);
        this.clientUnOnlineTimer = setInterval(() => {
            this.clientOnline = false;
        }, 1000);

        let { lastActive, sessions } = this.service.convertMappings(body);

        const session = await this.sessionService.findOneById(sessionId);

        let newSessions = sessions.map((session, index) => {
            const data = {
                ...session,
                data: session.data,
                time: session.timestamp - session.timestamp,
                serverSessionId: sessionId,
            };

            this.snapshotService.create(data);
            return data;
        });

        // this.snapshotService.update(sessionId, {
        //     lastActive: lastActive,
        //     length: newSessions[newSessions.length - 1].time,
        // });

        return { hasRequestedLive: false };
    }

    /**
     * 分配客户端身份标志,不存在生产新的UUID
     * @param identityData
     * @param sessionId
     */
    @Post('/session/:sessionId/identity')
    async identity(
        @Body('identityData') identityData,
        @Param('sessionId') sessionId,
    ) {
        if (identityData) {
            return { identifier: identityData.userId };
        }
        return { identifier: uuidv4() };
    }

    // 客户端与服务端是否保存在线状态
    @Put('/session/:session_id/ping')
    async ping(
        @Param('session_id') sessionId,
        @Headers('authorization') websiteId,
    ) {
        console.log('在线状态检查');
        this.clientOnline = false;

        const session = await this.sessionService.update(
            { id: sessionId },
            { isLive: true },
        );

        return false;
    }

    @Put('/session/:id/server_session/:i')
    server_session() {
        return { id: '5b154cb1455b11537d0baa84' };
    }

    @Get('login')
    login() {
        return this.usersService.test_login();
    }

    @Get('me')
    me() {
        return this.usersService.test();
    }

    @Get('subscription')
    subscription() {
        return this.subscriptionService.getSubscript();
    }
}
