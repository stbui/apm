import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { ApiEntity } from './api.entity';
import { API_TOKEN } from './api.constants';

@Injectable()
export class ApiService extends CrudService<ApiEntity> {
  constructor(
    @Inject(API_TOKEN) protected readonly repository: Repository<ApiEntity>,
  ) {
    super();
  }
}
