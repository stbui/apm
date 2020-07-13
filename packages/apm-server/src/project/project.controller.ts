import { Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { ProjectService } from './project.service';
import { ProjectEntity } from './project.entity';

@ApiTags('collection')
@Controller('collection')
export class ProjectController extends CrudController<ProjectEntity> {
    constructor(protected service: ProjectService) {
        super();
    }
}
