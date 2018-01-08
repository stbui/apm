import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import * as bodyParser from 'body-parser';

// const app: Promise<INestApplication> = NestFactory.create(ApplicationModule);
// app.then(instance =>
//   instance.listen(3000, () =>
//     console.log('Application is listening on port 3000')
//   )
// );

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(bodyParser.json());
  await app.listen(3000);
}

bootstrap();