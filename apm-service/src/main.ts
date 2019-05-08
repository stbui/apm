/**
 *
 * @author Stbui <https://github.com/stbui>
 */

import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Config } from './config/config';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('apm')
    .setDescription('The apm API description')
    .setVersion('1.0')
    .addTag('apm')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(Config.port);

  Logger.log(`Server running on http://localhost:${Config.port}`);
}
bootstrap();
