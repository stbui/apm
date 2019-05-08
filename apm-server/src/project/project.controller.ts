import { Controller } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { ProjectService } from './project.service';

@ApiUseTags('project')
@Controller('project')
export class ProjectController extends CrudController<any> {
  constructor(private service: ProjectService) { super(service); }

}
