import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SingleErrorValidationPipe } from './shared/pipes/validation.pipe';
import { swaggerConfig } from './infrastructure/config/swagger.config';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './infrastructure/redis/redis.service';
import * as session from 'express-session';
import { corsConfig } from './infrastructure/config/cors.config';
import { sessionConfig } from './infrastructure/config/session.config';
import { SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const redis = app.get(RedisService);

  app.enableCors(corsConfig(config));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new SingleErrorValidationPipe());
  app.use(session(sessionConfig(config, redis)));
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig());
  SwaggerModule.setup('docs', app, swaggerDocument);


  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(config.getOrThrow('PORT'));
}
bootstrap().then(r => console.log('Server is started'));
