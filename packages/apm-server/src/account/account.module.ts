import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountProviders } from './account.providers';

import { WebsiteModule } from '../website/website.module';

@Module({
    imports: [DatabaseModule, WebsiteModule],
    controllers: [AccountController],
    providers: [AccountService, ...AccountProviders],
    exports: [AccountService],
})
export class AccountModule {}
