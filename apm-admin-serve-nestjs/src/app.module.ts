import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { CollectionModule } from './collection/collection.module';
import { PerformanceModule } from './performance/performance.module';
import { ScriptModule } from './script/script.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, CollectionModule, PerformanceModule, ScriptModule, UserModule],
  controllers: [AppController],
  providers: [ AppService ]
})
export class AppModule {}
