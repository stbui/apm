import { NestFactory, FastifyAdapter } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, new FastifyAdapter());
  // app.useStaticAssets({
  //   root: join(__dirname, '..', 'public'),
  //   prefix: '/public/',
  // });

  const app = await NestFactory.create(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
