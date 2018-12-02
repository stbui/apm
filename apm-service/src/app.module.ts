import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionModule } from './collection/collection.module';
import { PerformanceModule } from './performance/performance.module';
import { ScriptModule } from './script/script.module';
import { UserModule } from './user/user.module';
import { ApiModule } from './api/api.module';
import { ProjectModule } from './project/project.module';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [CollectionModule, PerformanceModule, UserModule, ApiModule, ProjectModule, SettingModule],
  controllers: [AppController],
  providers: [ AppService ]
})
export class AppModule {}
