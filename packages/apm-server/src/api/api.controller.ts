import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Headers,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { SessionService } from '../session/session.service';
import { SnapshotService } from '../snapshot/snapshot.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('api')
export class ApiController {
    timestamp: number;
    clientOnline: boolean = true;
    clientUnOnlineTimer: NodeJS.Timer;

    constructor(
        private service: ApiService,
        private readonly sessionService: SessionService,
        private readonly snapshotService: SnapshotService,
        private readonly SubscriptionService: SubscriptionService,
    ) {}

    /**
     * 建立页面快照
     * @param body
     * @param websiteId
     */
    @Post('/session')
    async session(@Body() body, @Headers('authorization') accessToken) {
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
        };

        const sessionModel = {
            ...body,
            start: body.timestamp,
            clientStartMilliseconds: body.timestamp,
            accessToken: accessToken,
        };

        const result = await this.sessionService.create(sessionModel);

        const model = {
            data,
            index: 0,
            time: -1,
            timestamp: body.timestamp,
            type: 'dom_snapshot',
            serverSessionId: result.id,
        };

        await this.snapshotService.insertMany(model);
        const mappings = this.service.findMappings();

        return {
            // sessionId
            id: result.id,
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
        @Headers('authorization') websiteId,
        @Body() body,
    ) {
        // 客户端在推送事件
        this.clientOnline = true;

        clearInterval(this.clientUnOnlineTimer);
        this.clientUnOnlineTimer = setInterval(() => {
            this.clientOnline = false;
        }, 1000);

        let { lastActive, sessions } = this.service.convertMappings(body);

        const se = await this.sessionService.findOneById(sessionId);

        let newSessions = sessions.map((session, index) => {
            const data = {
                ...session,
                data: session.data,
                time: session.timestamp - se.timestamp,
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
     * 分配客户端标志
     * @param b
     * @param p
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
    ping(@Param('session_id') sessionId, @Headers('authorization') websiteId) {
        console.log('在线状态检查');
        this.clientOnline = false;
        return false;
    }

    @Put('/session/:id/server_session/:i')
    server_session() {
        return { id: '5b154cb1455b11537d0baa84' };
    }

    @Get('login')
    login() {
        return {
            hasActivePlan: true,
            verificationToken: '5050f71368cf465bbaecadba4cdec022',
            specialOffer: null,
            token:
                'eyJhbGciOiJIUzI1NiIsImlhdCI6MTU5Mjc4OTQyMiwiZXhwIjoxNjI0MzI1NDIyfQ.eyJ1c2VyX2lkIjo2MzA5fQ.W_Rsx8jmY4VWh-QsFHTufxLvt_Ws3VZOM_Hk4PZmJdU',
            id: 6309,
            organizationUrl: 'stbui',
            firstName: 'stb',
            isTrial: true,
            email: 'stbui@stbui.com',
            created: 1592746402.0,
            lastName: 'ui',
            isAdmin: false,
            organizationRole: 'Product Management',
            trialDaysLeft: 365,
            isVerified: false,
        };
    }

    @Get('me')
    me() {
        return {
            created: 1591023516.0,
            email: 'stbui@stbui.com',
            isVerified: false,
            organizationUrl: 'clusterhub',
            isAdmin: false,
            verificationToken: 'da7d7bf92c2d4479999bc8509e493c7c',
            hasActivePlan: true,
            trialDaysLeft: 7,
            organizationName: 'clusterhub@aliyun.com',
            specialOffer: null,
            timezoneName: 'UTC',
            organizationRole: 'Product Management',
            firstName: 'G',
            id: 6265,
            lastName: 'B',
            isTrial: true,
            role: 'user',
        };
    }

    @Get('subscription')
    subscription() {
        return this.SubscriptionService.getSubscript();
    }
}
