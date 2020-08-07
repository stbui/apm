import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsProviders } from './analytics.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [AnalyticsController],
    providers: [AnalyticsService, ...AnalyticsProviders],
    exports: [AnalyticsService],
})
export class AnalyticsModule {}
