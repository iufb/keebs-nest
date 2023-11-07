import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { LoggerFactory } from 'LoggerFactory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerFactory('MyApp'),
  });
  app.setGlobalPrefix('api');
  app.enableCors({ credentials: true, origin: 'http://localhost:5173' });
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
