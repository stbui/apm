import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';

import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionProviders } from './session.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SessionController],
  providers: [SessionService, ...SessionProviders],
  exports: [SessionService],
})
export class SessionModule {}
