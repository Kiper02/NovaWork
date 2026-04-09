import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export function corsConfig(configService: ConfigService): CorsOptions {
  const allowedOrigins = configService.getOrThrow<string>(
    'CORS_ALLOWED_ORIGINS',
  ).split(',') ?? [];
  allowedOrigins.push('http://localhost:5000')
  return {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  };
}
