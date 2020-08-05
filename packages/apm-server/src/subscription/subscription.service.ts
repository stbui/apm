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
}
