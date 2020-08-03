import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { AuthMethodEntity } from './auth_method.entity';
import { AuthMethodRepositoryToken } from './auth_method.constants';

@Injectable()
export class AuthMethodService extends CrudService<AuthMethodEntity> {
    constructor(
        @Inject(AuthMethodRepositoryToken)
        protected readonly repository: Repository<AuthMethodEntity>,
    ) {
        super();
    }
}
