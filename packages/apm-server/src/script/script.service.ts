import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { ScriptEntity } from './script.entity';
import { SCRIPT_TOKEN } from './script.constants';
import { ScriptDb } from './script.db';

@Injectable()
export class ScriptService extends CrudService<ScriptEntity> {
  constructor(
    @Inject(SCRIPT_TOKEN)
    protected readonly repository: Repository<ScriptEntity>,
  ) {
    super();
  }

  findAll(): any {
    return ScriptDb.index;
  }
}
