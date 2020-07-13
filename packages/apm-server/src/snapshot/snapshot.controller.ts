import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { SnapshotService } from './snapshot.service';
import { SnapshotEntity } from './snapshot.entity';

@ApiTags('snapshot')
@Controller('snapshot')
export class SnapshotController extends CrudController<SnapshotEntity> {
    constructor(protected service: SnapshotService) {
        super();
    }
}
