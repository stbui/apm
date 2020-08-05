import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { AccountController } from './analytics.controller';
import { AccountService } from './analytics.service';
import { AccountProviders } from './analytics.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [AccountController],
    providers: [AccountService, ...AccountProviders],
    exports: [AccountService],
})
export class AccountModule {}
