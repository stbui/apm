import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { FeaturesEntity } from './features.entity';
import { ACCOUNT_TOKEN } from './features.constants';

@Injectable()
export class AccountService extends CrudService<FeaturesEntity> {
    constructor(
        @Inject(ACCOUNT_TOKEN)
        protected readonly repository: Repository<FeaturesEntity>,
    ) {
        super();
    }
}
