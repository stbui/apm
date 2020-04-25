import { Controller } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { ScriptService } from './script.service';
import { ScriptEntity } from './script.entity';

@ApiUseTags('script')
@Controller('script')
export class ScriptController extends CrudController<ScriptEntity> {
    constructor(protected service: ScriptService) {
        super();
    }
}
