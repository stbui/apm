import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CrudService } from '../common/crud/crud.service';
import { SessionEntity } from './session.entity';
import { TOKEN } from './session.constants';

@Injectable()
export class SessionService extends CrudService<SessionEntity> {
    constructor(
        @Inject(TOKEN)
        protected readonly repository: Repository<SessionEntity>
    ) {
        super();
    }
}
