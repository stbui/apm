import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PerformanceService } from './performance.service';


@Controller()
export class PerformanceController {

    constructor(private service: PerformanceService) {

    }

    @Get('/performance.json')
    indexAction( @Query() q) {
        const { page } = q;
        return this.service.page(page).countSelect();
    }
}