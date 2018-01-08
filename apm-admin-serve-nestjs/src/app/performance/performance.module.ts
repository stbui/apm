import { Module } from '@nestjs/common';
import { PerformanceController } from './performance.controller';
import { PerformanceService } from './performance.service';

@Module({
    controllers:[PerformanceController],
    components: [
        PerformanceService
    ]
})
export class PerformanceModule{}
