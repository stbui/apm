import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { FeaturesEntity } from './features.entity';
import { featuresRepositoryToken } from './features.constants';

@Injectable()
export class FeaturesService extends CrudService<FeaturesEntity> {
    constructor(
        @Inject(featuresRepositoryToken)
        protected readonly repository: Repository<FeaturesEntity>,
    ) {
        super();
    }
}
