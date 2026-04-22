import { Injectable } from '@nestjs/common';
import { AcquiringPort } from '../../../../core/ports/bank-payment/acquiring/acquiring.port';
import { BankClientFactory } from '../client/bank-client.factory';
import { AcquiringMapper } from '../mappers/acquiring.mapper';
import {
  IInitPaymentPortRequestType,
  IInitPaymentPortResultType,
} from 'src/core/ports/bank-payment/acquiring/types/init-payment.type';
import { IChargePaymentPortRequestType, IChargePaymentPortResultType } from 'src/core/ports/bank-payment/acquiring/types/charge-payment.type';
import { createHash } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { IGetQrBankListRequest, IGetQrBankListResponse } from 'src/core/ports/bank-payment/acquiring/types/get-qr.type';
import {
  ITinkoffGetBankListRequest,
  ITinkoffGetQrBankListResponse,
} from '../types/acquiring/get-qr.type';

@Injectable()
export class AcquiringAdapter implements AcquiringPort {
  private readonly baseUrl = 'https://securepay.tinkoff.ru';
  private readonly terminalKey: string;
  private readonly secretKey: string;

  public constructor(
    private readonly clientFactory: BankClientFactory,
    private readonly configService: ConfigService,
  ) {
    this.terminalKey = configService.getOrThrow('BANK_TERMINAL_KEY');
    this.secretKey = configService.getOrThrow('BANK_SECRET_KEY');
  }
  public async getQrBankList(
    data: IGetQrBankListRequest,
  ): Promise<IGetQrBankListResponse[]> {
    const requestData = AcquiringMapper.toGetQrBankListRequest(data);
    const body: Omit<ITinkoffGetBankListRequest, 'Token'> = {
      ...requestData,
      TerminalKey: this.terminalKey,
    };

    const token = this.generateToken(body);
    const fullBody = { ...body, Token: token };

    const client = this.clientFactory.getAcquiringClient();
    const response = await client.request<ITinkoffGetQrBankListResponse>({
      url: `${this.baseUrl}/v2/Init`,
      method: 'POST',
      data: fullBody,
    });

    return response.BankList.map(AcquiringMapper.toGetQrBankListPortResult);
  }

  public async initiatePayment(
    data: IInitPaymentPortRequestType,
  ): Promise<IInitPaymentPortResultType> {
    const requestData = AcquiringMapper.toTinkoffInitPaymentRequest(data);

    const body = {
      ...requestData,
      TerminalKey: this.terminalKey,
    };
    const token = this.generateToken(body);
    const fullBody = { ...body, Token: token };

    const client = this.clientFactory.getAcquiringClient();
    const response = await client.request<any>({
      url: `${this.baseUrl}/v2/Init`,
      method: 'POST',
      data: fullBody,
    });

    return AcquiringMapper.toInitPaymentPortResult(response);
  }

  public async chargePayment(
    data: IChargePaymentPortRequestType,
  ): Promise<IChargePaymentPortResultType> {
    throw new Error('Method not implemented.');
  }

  private generateToken(data: Record<string, any>): string {
    const sortedKeys = Object.keys(data).sort();
    const concatenated = sortedKeys.map((key) => String(data[key])).join('');
    const tokenString = concatenated + this.secretKey;
    return createHash('sha256').update(tokenString).digest('hex');
  }
}