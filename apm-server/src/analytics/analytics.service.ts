import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { AnalyticsEntity } from './analytics.entity';
import { AnalyticsRepositoryToken } from './analytics.constants';

@Injectable()
export class AnalyticsService extends CrudService<AnalyticsEntity> {
    constructor(
        @Inject(AnalyticsRepositoryToken)
        protected readonly repository: Repository<AnalyticsEntity>,
    ) {
        super();
    }
}
