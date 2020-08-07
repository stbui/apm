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
import { SessionModule } from './session/session.module';
import { ApiModule } from './api/api.module';
import { WebsiteModule } from './website/website.module';
//
import { SettingModule } from './setting/setting.module';
import { AccountModule } from './account/account.module';
import { AuthMethodModule } from './auth_method/auth_method.module';
import { AuthAettingsModule } from './auth_settings/auth_settings.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { FeaturesModule } from './features/features.module';
import { AnalyticsModule } from './analytics/analytics.module';

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
        WebsiteModule,
        ApiModule,
        AccountModule,
        AuthMethodModule,
        AuthAettingsModule,
        SubscriptionModule,
        FeaturesModule,
        AnalyticsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(OriginMiddleware).forRoutes('session');
    }
}
