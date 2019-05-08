import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config/config'
import { UsersModule } from './users/users.module'
import { CollectionModule } from './collection/collection.module'
import { PerformanceModule } from './performance/performance.module'
import { SnapshotModule } from './snapshot/snapshot.module'
import { ScriptModule } from './script/script.module'
import { ProjectModule } from './project/project.module'

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot({
      ...Config.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    CollectionModule,
    PerformanceModule, SnapshotModule, ScriptModule, ProjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
