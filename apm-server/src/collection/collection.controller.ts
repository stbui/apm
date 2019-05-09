
import { Controller } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { CollectionService } from './collection.service';
import { CollectionEntity } from './collection.entity'

@ApiUseTags('collection')
@Controller('collection')
export class CollectionController extends CrudController<CollectionEntity> {
  constructor(protected service: CollectionService) {
    super();
  }
}
