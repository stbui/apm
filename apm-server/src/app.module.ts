import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
// 数据模块
import { DatabaseModule } from './common/database/database.module';
// 鉴权模块
import { AuthModule } from './common/auth/auth.module';
import { OriginMiddleware } from './common/middleware/origin.middlewate';

// 业务模块（核心）
import { UsersModule } from './users/users.module';
import { CollectionModule } from './collection/collection.module';
import { PerformanceModule } from './performance/performance.module';
import { SnapshotModule } from './snapshot/snapshot.module';
import { ScriptModule } from './script/script.module';
import { ProjectModule } from './project/project.module';
import { SettingModule } from './setting/setting.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CollectionModule,
    PerformanceModule,
    SnapshotModule,
    ScriptModule,
    ProjectModule,
    SettingModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OriginMiddleware).forRoutes('session');
  }
}
