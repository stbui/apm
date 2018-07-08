import 'reflect-metadata';
import { Runner } from '@apm/core';
import { AppModule } from './src/app.module';

// 启动模块
Runner.run(AppModule);
