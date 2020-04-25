import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ApiProviders } from './api.providers';
import { SnapshotModule } from '../snapshot/snapshot.module';
import { SettingModule } from '../setting/setting.module';
import { WebsiteModule } from '../website/website.module';
import { SessionModule } from '../session/session.module';

@Module({
    imports: [DatabaseModule, SnapshotModule, SettingModule, WebsiteModule, SessionModule],
    controllers: [ApiController],
    providers: [ApiService, ...ApiProviders],
})
export class ApiModule {}
