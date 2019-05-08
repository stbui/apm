
import { Controller } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { ScriptService } from './script.service';

@ApiUseTags('script')
@Controller('script')
export class ScriptController extends CrudController<any> {
  constructor(private service: ScriptService) { super(service); }

}
