export abstract class AuthStrategy {
  public abstract apply<TData>(
    config: RequestConfig<TData>,
  ): Promise<RequestConfig<TData>>;
}

export interface RequestConfig<TData = any> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: TData;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  httpsAgent?: any;
}