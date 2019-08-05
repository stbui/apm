import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { SessionService } from './session.service';
import { SessionEntity } from './session.entity';

@ApiUseTags('session')
@Controller('session')
export class SessionController extends CrudController<SessionEntity> {
    constructor(protected service: SessionService) {
        super();
    }
}
