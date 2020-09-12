import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountProviders } from './account.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [AccountController],
    providers: [AccountService, ...AccountProviders],
    exports: [AccountService],
})
export class AuthAettingsModule {}
