import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AuthStrategy, RequestConfig } from './auth-strategy.interface';

@Injectable()
export class IdempotencyKeyStrategy extends AuthStrategy {
  public async apply<TData>(
    config: RequestConfig<TData>,
  ): Promise<RequestConfig<TData>> {
    if (config.method === 'GET') return config;
    return {
      ...config,
      headers: { ...config.headers, 'Idempotency-Key': randomUUID() },
    };
  }
}
