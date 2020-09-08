import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TypeormExceptionFilter } from './common/filters/typeorm-exception.filter';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { Config } from './config/config';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // app.setGlobalPrefix('v1');
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(cookieParser());

    app.useGlobalFilters(new TypeormExceptionFilter());

    // 允许跨域请求
    app.enableCors({
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
        credentials: true,
    });

    // swagger
    const options = new DocumentBuilder()
        .setTitle(Config.name)
        .setDescription(Config.description)
        .setVersion(Config.version)
        .addTag(Config.name)
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    await app.listen(Config.port);
    Logger.log(`Server running on http://localhost:${Config.port}`);
}
bootstrap();
