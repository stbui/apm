import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';

import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { SettingProviders } from './setting.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SettingController],
  providers: [SettingService, ...SettingProviders],
  exports: [SettingService],
})
export class SettingModule {}
