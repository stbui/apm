import { Controller } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { PerformanceService } from './performance.service';
import { PerformanceEntity } from './performance.entity';

@ApiUseTags('performance')
@Controller('performance')
export class PerformanceController extends CrudController<PerformanceEntity> {
    constructor(protected service: PerformanceService) {
        super();
    }
}
