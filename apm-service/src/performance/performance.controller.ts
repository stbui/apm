import { Controller, Get, Query } from '@nestjs/common';
import { PerformanceService } from './performance.service';

@Controller('performance')
export class PerformanceController {
  constructor(private service: PerformanceService) {}

  @Get('/')
  indexAction(@Query() q) {
    const { page } = q;
    return this.service.page(page).countSelect();
  }
}
