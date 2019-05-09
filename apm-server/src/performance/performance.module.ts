import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module'

import { PerformanceController } from './performance.controller';
import { PerformanceService } from './performance.service';
import { PerformanceProviders } from './performance.providers';


@Module({
  imports: [DatabaseModule],
  controllers: [PerformanceController],
  providers: [PerformanceService, ...PerformanceProviders]
})
export class PerformanceModule { }
