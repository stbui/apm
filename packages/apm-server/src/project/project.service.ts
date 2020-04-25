import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { ProjectEntity } from './project.entity';
import { PROJECT_TOKEN } from './project.constants';

@Injectable()
export class ProjectService extends CrudService<ProjectEntity> {
    constructor(
        @Inject(PROJECT_TOKEN)
        protected readonly repository: Repository<ProjectEntity>
    ) {
        super();
    }
}
