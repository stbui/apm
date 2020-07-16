import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { AccountController } from './features.controller';
import { AccountService } from './features.service';
import { AccountProviders } from './features.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [AccountController],
    providers: [AccountService, ...AccountProviders],
    exports: [AccountService],
})
export class AccountModule {}
