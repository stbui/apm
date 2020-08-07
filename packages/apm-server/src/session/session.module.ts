import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { AuthModule } from '../common/auth/auth.module';

import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionProviders } from './session.providers';

import { SnapshotModule } from '../snapshot/snapshot.module';

@Module({
    imports: [DatabaseModule, AuthModule, SnapshotModule],
    controllers: [SessionController],
    providers: [SessionService, ...SessionProviders],
    exports: [SessionService],
})
export class SessionModule {}
