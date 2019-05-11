import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { CollectionEntity } from './collection.entity';
import { COLLECTION_TOKEN } from './collection.constants';

@Injectable()
export class CollectionService extends CrudService<CollectionEntity> {
  constructor(
    @Inject(COLLECTION_TOKEN)
    protected readonly repository: Repository<CollectionEntity>,
  ) {
    super();
  }
}
