import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as https from 'node:https';
import * as path from 'node:path';
import { AuthStrategy, RequestConfig } from './auth-strategy.interface';

@Injectable()
export class MutualTLSStrategy extends AuthStrategy {
  private readonly httpsAgent: https.Agent | null = null;

  public constructor(private readonly configService: ConfigService) {
    super();
    const isDev = this.configService.get('NODE_ENV') === 'development';
    if (!isDev) {
      const __dirname = path.resolve();
      this.httpsAgent = new https.Agent({
        cert: path.join(__dirname, 'certs', 'cert.pem'),
        key: path.join(__dirname, 'certs', 'key.key'),
      });
    }
  }

  public async apply<TData>(
    config: RequestConfig<TData>,
  ): Promise<RequestConfig<TData>> {
    if (!this.httpsAgent) return config;
    return { ...config, httpsAgent: this.httpsAgent };
  }
}
