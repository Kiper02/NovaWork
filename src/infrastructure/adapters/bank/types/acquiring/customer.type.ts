import { IBaseBankResponse } from '../common/base-response.type';

export interface ICustomerResponse extends IBaseBankResponse {
  CustomerKey: string;
  Email: string;
  Phone: string;
}

export type CreateCustomerResponseType = Pick<ICustomerResponse, 'CustomerKey'>;
