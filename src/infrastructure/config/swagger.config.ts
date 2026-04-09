import {
  DocumentBuilder,
  OpenAPIObject,
} from '@nestjs/swagger';

export function swaggerConfig(): Omit<OpenAPIObject, 'paths'> {
  return new DocumentBuilder()
    .setTitle('Nova Work')
    .setDescription('API для сервиса Nova Work')
    .setVersion('1.0')
    .addTag('Nova Work')
    .addCookieAuth()
    .build();
}
