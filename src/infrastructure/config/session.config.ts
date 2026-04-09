import { RedisStore } from 'connect-redis';
import { RedisService } from '../redis/redis.service';
import { msUtil } from '../../shared/utils/ms.util';
import { parseBooleanUtil } from '../../shared/utils/parse-boolean.util';
import { ConfigService } from '@nestjs/config';
import type { SessionOptions } from 'express-session';

export function sessionConfig(
  configService: ConfigService,
  redisService: RedisService,
): SessionOptions {
  return {
    secret: configService.getOrThrow<string>('SESSION_SECRET'),
    name: configService.getOrThrow<string>('SESSION_NAME'),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: msUtil(configService.getOrThrow<string>('SESSION_MAX_AGE')),
      httpOnly: parseBooleanUtil(
        configService.getOrThrow<string>('SESSION_HTTP_ONLY'),
      ),
      secure: parseBooleanUtil(
        configService.getOrThrow<string>('SESSION_SECURE'),
      ),
      sameSite: 'lax',
    },
    store: new RedisStore({
      client: redisService,
      prefix: configService.getOrThrow<string>('SESSION_FOLDER'),
    }),
  };
}
