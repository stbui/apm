import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { CorsMiddleware } from './common/middleware/cors.middleware';
import { ScriptModule } from './script/script.module';
import { CollectionModule } from './collection/collection.module';
import { PerformanceModule } from './performance/performance.module';

import { DatabaseModule } from './common/database/database.module';
import { AppController } from './app.controller';

@Module({
  modules: [DatabaseModule, ScriptModule, CollectionModule, PerformanceModule],
  controllers: [AppController],
  components: [
  ]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(CorsMiddleware).with('apm').forRoutes(
      { path: '/', method: RequestMethod.ALL },
      { path: '/apm.js', method: RequestMethod.ALL },
      { path: '/script.json', method: RequestMethod.ALL },
      { path: '/collection.json', method: RequestMethod.ALL },
      { path: '/performance.json', method: RequestMethod.ALL },
    );
  }
}