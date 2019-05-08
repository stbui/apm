import { Controller } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { SnapshotService } from './snapshot.service';

@ApiUseTags('snapshot')
@Controller('snapshot')
export class SnapshotController extends CrudController<any> {
  constructor(private service: SnapshotService) {
    super(service);
  }
}
