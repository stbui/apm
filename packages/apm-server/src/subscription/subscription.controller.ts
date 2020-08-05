import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CrudController } from '../common/crud/crud.controller';
import { SubscriptionService } from './subscription.service';
import { SubscriptionEntity } from './subscription.entity';

@ApiTags('api/subscription')
@Controller('api/subscription')
export class SubscriptionController extends CrudController<SubscriptionEntity> {
    constructor(protected service: SubscriptionService) {
        super();
    }

    @Get()
    list() {
        return {
            userSeats: 3,
            nextBillingDate: null,
            planName: 'Free Trial',
            subscriptionId: null,
            isFree: true,
            hasCustomPlan: false,
            monthlySessions: 1000,
            planEndDate: '05 July 2020',
        };
    }
}
