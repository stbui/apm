import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/core/adapters/fastify-adapter';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.useStaticAssets({
    root: join(__dirname, 'public'),
    prefix: '/public/',
  });
  await app.listen(3000);
}
bootstrap();
