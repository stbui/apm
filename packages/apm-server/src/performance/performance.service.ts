import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { PerformanceEntity } from './performance.entity';
import { PERFORMANCE_TOKEN } from './performance.constants';
import { PerformanceDb } from './performance.db';

@Injectable()
export class PerformanceService extends CrudService<PerformanceEntity> {
  constructor(
    @Inject(PERFORMANCE_TOKEN)
    protected readonly repository: Repository<PerformanceEntity>,
  ) {
    super();
  }

  findAll(): any {
    return PerformanceDb.index;
  }
}
