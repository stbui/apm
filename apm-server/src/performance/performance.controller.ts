import { Controller } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { PerformanceService } from './performance.service';

@ApiUseTags('performance')
@Controller('performance')
export class PerformanceController extends CrudController<any> {
  constructor(private service: PerformanceService) { super(service); }

}
