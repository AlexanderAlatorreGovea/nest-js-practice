import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = +process.env.APP_PORT || 3000;

  app.enableCors();

  await app.listen(port);
}
bootstrap();
