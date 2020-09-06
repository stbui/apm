import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { SubscriptionEntity } from './subscription.entity';
import { SubscriptionRepositoryToken } from './subscription.constants';

@Injectable()
export class SubscriptionService extends CrudService<SubscriptionEntity> {
    constructor(
        @Inject(SubscriptionRepositoryToken)
        protected readonly repository: Repository<SubscriptionEntity>,
    ) {
        super();
    }

    getSubscript() {
        return {
            userSeats: 3,
            nextBillingDate: null,
            planName: 'Free Trial',
            subscriptionId: null,
            isFree: true,
            hasCustomPlan: false,
            monthlySessions: 1000,
            planEndDate: '05 July 2020',
        };
    }
}
