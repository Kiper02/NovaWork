import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, Method } from 'axios';
import { BankApiException } from '../../../exceptions/bank/bank-api.exception';
import {
  AuthStrategy,
  RequestConfig,
} from '../strategies/auth-strategy.interface';

@Injectable()
export class TBankApiClient {
  public constructor(private readonly strategies: AuthStrategy[]) {}

  public async request<TResponse = any, TData = any>(
    config: RequestConfig<TData>,
  ): Promise<TResponse> {
    let finalConfig: RequestConfig = config;
    for (const strategy of this.strategies) {
      finalConfig = await strategy.apply(finalConfig);
    }

    const axiosConfig: AxiosRequestConfig = {
      url: finalConfig.url,
      method: finalConfig.method as Method,
      data: finalConfig.data,
      headers: finalConfig.headers,
      params: finalConfig.params,
      httpsAgent: finalConfig.httpsAgent,
    };

    try {
      const response = await axios(axiosConfig);
      return response.data as TResponse;
    } catch (error) {
      throw new BankApiException('T-Bank API request failed', error);
    }
  }
}
