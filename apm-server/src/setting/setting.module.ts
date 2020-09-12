import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';

import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { SettingProviders } from './setting.providers';

import { SessionModule } from '../session/session.module';

@Module({
    imports: [DatabaseModule, SessionModule],
    controllers: [SettingController],
    providers: [SettingService, ...SettingProviders],
    exports: [SettingService],
})
export class SettingModule {}
