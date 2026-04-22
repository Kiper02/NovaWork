import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthStrategy, RequestConfig } from './auth-strategy.interface';

@Injectable()
export class BearerTokenStrategy extends AuthStrategy {
  public constructor(private readonly configService: ConfigService) {
    super();
  }

  public async apply<TData>(
    config: RequestConfig<TData>,
  ): Promise<RequestConfig<TData>> {
    const token = this.configService.get<string>('BANK_API_TOKEN');
    if (!token) return config;
    return {
      ...config,
      headers: { ...config.headers, Authorization: `Bearer ${token}` },
    };
  }
}
