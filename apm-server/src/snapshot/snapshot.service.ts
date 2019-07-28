import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { SnapshotEntity } from './snapshot.entity';
import { SNAPSHOT_TOKEN } from './snapshot.constants';

@Injectable()
export class SnapshotService extends CrudService<SnapshotEntity> {
    constructor(
        @Inject(SNAPSHOT_TOKEN)
        protected readonly repository: Repository<SnapshotEntity>,
    ) {
        super();
    }
}
