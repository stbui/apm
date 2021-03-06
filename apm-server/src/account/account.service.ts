import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { AccountEntity } from './account.entity';
import { ACCOUNT_TOKEN } from './account.constants';

@Injectable()
export class AccountService extends CrudService<AccountEntity> {
    constructor(
        @Inject(ACCOUNT_TOKEN)
        protected readonly repository: Repository<AccountEntity>,
    ) {
        super();
    }

    projects() {
        return [
            {
                isOwner: true,
                isSubscribeForReportsEnabled: true,
                name: 'stbui',
                id: 10679,
                isSubscribedForReports: true,
                isSubscribedForAlerts: true,
            },
            {
                isOwner: true,
                isSubscribeForReportsEnabled: true,
                name: '2stbui',
                id: 10680,
                isSubscribedForReports: true,
                isSubscribedForAlerts: true,
            },
        ];
    }

    tokens() {
        return [];
    }

    stats_sessions() {
        return { sessionsLimitForPlan: 1000, sessionsCountForCurrentPeriod: 1 };
    }
}
