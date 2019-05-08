
import { Controller } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { CollectionService } from './collection.service';

@ApiUseTags('collection')
@Controller('collection')
export class CollectionController extends CrudController<any> {
  constructor(private service: CollectionService) {
    super(service);
  }
}
