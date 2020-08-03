import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { DataEntity } from './data.entity';
import { DataRepositoryToken } from './data.constants';

@Injectable()
export class DataService extends CrudService<DataEntity> {
    constructor(
        @Inject(DataRepositoryToken)
        protected readonly repository: Repository<DataEntity>,
    ) {
        super();
    }
}
