import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ApiProviders } from './api.providers';
import { SnapshotModule } from '../snapshot/snapshot.module';
import { SessionModule } from '../session/session.module';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
    imports: [
        DatabaseModule,
        SnapshotModule,
        SessionModule,
        SubscriptionModule,
    ],
    controllers: [ApiController],
    providers: [ApiService, ...ApiProviders],
})
export class ApiModule {}
