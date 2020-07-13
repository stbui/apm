import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { SessionService } from './session.service';
import { SessionEntity } from './session.entity';

@ApiTags('session')
@Controller('session')
export class SessionController extends CrudController<SessionEntity> {
    constructor(protected service: SessionService) {
        super();
    }
}
