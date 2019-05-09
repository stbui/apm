import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { Config } from './config/config';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://127.0.0.1:4200', // angular
    ],
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });

  // swagger
  const options = new DocumentBuilder()
    .setTitle('apm')
    .setDescription('The apm API description')
    .setVersion('1.0')
    .addTag('apm')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);


  await app.listen(Config.port);
  Logger.log(`Server running on http://localhost:${Config.port}`);

}
bootstrap();
