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

    @Get('subscribable_plans')
    subscribable_plans() {
        return {
            plans: [
                {
                    isMonthly: true,
                    userSeats: 3,
                    braintreePlanId: 'solo_monthly',
                    name: 'Basic',
                    isCustomPlan: false,
                    price: 99.0,
                    monthlySessions: 1000,
                    id: 86,
                },
                {
                    isMonthly: true,
                    userSeats: 5,
                    braintreePlanId: 'startup_monthly',
                    name: 'Standard',
                    isCustomPlan: false,
                    price: 199.0,
                    monthlySessions: 10000,
                    id: 87,
                },
                {
                    isMonthly: true,
                    userSeats: 10,
                    braintreePlanId: 'scale_up_monthy',
                    name: 'Pro',
                    isCustomPlan: false,
                    price: 399.0,
                    monthlySessions: 25000,
                    id: 88,
                },
                {
                    isMonthly: false,
                    userSeats: 3,
                    braintreePlanId: 'solo_annually',
                    name: 'Basic annually',
                    isCustomPlan: false,
                    price: 89.0,
                    monthlySessions: 1000,
                    id: 90,
                },
                {
                    isMonthly: false,
                    userSeats: 5,
                    braintreePlanId: 'startup_annually',
                    name: 'Standard annually',
                    isCustomPlan: false,
                    price: 179.0,
                    monthlySessions: 10000,
                    id: 91,
                },
                {
                    isMonthly: false,
                    userSeats: 10,
                    braintreePlanId: 'scale_up_annually',
                    name: 'Pro annually',
                    isCustomPlan: false,
                    price: 359.0,
                    monthlySessions: 25000,
                    id: 92,
                },
            ],
        };
    }

    @Get('client_token')
    client_token() {
        return {
            clientToken:
                'eyJ2ZXJzaW9uIjoyLCJlbnZpcm9ubWVudCI6InByb2R1Y3Rpb24iLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjSEp2WkhWamRHbHZiaUlzSW1semN5STZJa0YxZEdoNUluMC5leUpsZUhBaU9qRTFPVEk0TkRBNU9EQXNJbXAwYVNJNklqTTVabUl3Tm1FeExUazRORGd0TkdZM09TMDRZbVV4TFRsak9EUmxPV1kyTUdReFlpSXNJbk4xWWlJNkluQjJhemg2TTJSb1puQnhaMlp0WkdnaUxDSnBjM01pT2lKQmRYUm9lU0lzSW0xbGNtTm9ZVzUwSWpwN0luQjFZbXhwWTE5cFpDSTZJbkIyYXpoNk0yUm9abkJ4WjJadFpHZ2lMQ0oyWlhKcFpubGZZMkZ5WkY5aWVWOWtaV1poZFd4MElqcDBjblZsZlN3aWNtbG5hSFJ6SWpwYkltMWhibUZuWlY5MllYVnNkQ0pkTENKdmNIUnBiMjV6SWpwN2ZYMC4zblFLMDBwZjZxWm1KVDU1bVBqbEszYXBHaVJHclFCNEFlUTYzR01ZaHBWeUhtNWtTNXdZODgwSmtCdFVVZTB0SjhvaEV3bjNXZGh3R1BLbl8zOUtYUSIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvcHZrOHozZGhmcHFnZm1kaC9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4In0sImNoYWxsZW5nZXMiOlsiY3Z2Il0sImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvcHZrOHozZGhmcHFnZm1kaC9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLmNvbSIsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL2NsaWVudC1hbmFseXRpY3MuYnJhaW50cmVlZ2F0ZXdheS5jb20vcHZrOHozZGhmcHFnZm1kaCJ9LCJ0aHJlZURTZWN1cmVFbmFibGVkIjp0cnVlLCJwYXlwYWxFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6InB2azh6M2RoZnBxZ2ZtZGgiLCJ2ZW5tbyI6Im9mZiJ9',
        };
    }
}
