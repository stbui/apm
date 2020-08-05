import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { AccountEntity } from './analytics.entity';
import { ACCOUNT_TOKEN } from './analytics.constants';

@Injectable()
export class AccountService extends CrudService<AccountEntity> {
    constructor(
        @Inject(ACCOUNT_TOKEN)
        protected readonly repository: Repository<AccountEntity>,
    ) {
        super();
    }
}
