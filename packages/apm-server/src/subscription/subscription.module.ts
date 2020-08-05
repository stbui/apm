import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { SubscriptionProviders } from './subscription.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [SubscriptionController],
    providers: [SubscriptionService, ...SubscriptionProviders],
    exports: [SubscriptionService],
})
export class SubscriptionModule {}
