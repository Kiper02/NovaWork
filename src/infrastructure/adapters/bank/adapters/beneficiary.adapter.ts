import { Injectable } from '@nestjs/common';
import { BeneficiaryPort } from '../../../../core/ports/bank-payment/beneficiary/beneficiary.port';
import { BankClientFactory } from '../client/bank-client.factory';
import { BeneficiaryMapper } from '../mappers/beneficiary.mapper';
import { ConfigService } from '@nestjs/config';
import { BeneficiaryDetailsValueObject } from '../../../../core/domain/value-objects/beneficiary/beneficiary-details.value-object';
import { EnumBeneficiaryType } from '../../../../core/domain/entities/finance/beneficiary.entity';
import {
  IScoringStatusPortResult,
  IPaginatedScoringStatusResult,
  IScoringStatusQueryParams,
} from 'src/core/ports/bank-payment/beneficiary/types/scoring-status.type';
import { ITinkoffCreateBeneficiaryResponse } from '../types/beneficiary/create-beneficiary.type';
import { ITinkoffCheckBeneficiaryScoringResponse } from '../types/beneficiary/check-beneficiary-scoring.type';
import { IBeneficiaryPortResult } from '../../../../core/ports/bank-payment/beneficiary/types/create-beneficiary.type';
import {
  IAddCardDetailsRequest,
  IAddPaymentDetailsRequest,
  IAddSbpDetailsRequest,
  IBankDetailsPortResponse,
} from '../../../../core/ports/bank-payment/beneficiary/types/bank-details.type';
import { IAddCardPortResult } from '../../../../core/ports/bank-payment/beneficiary/types/add-card-request.type';
import { EnumBankDetailsType } from '../../../../core/domain/entities/finance/bank-details.entity';
import {
  EnumTinkoffBankDetailsType,
  ITinkoffBankDetailsResponse,
  ITinkoffCreateBankDetails,
} from '../types/beneficiary/bank-details.type';
import { CardEncryptionService } from '../services/card-encryption.service';

@Injectable()
export class BeneficiaryAdapter implements BeneficiaryPort {
  private readonly baseUrl: string;
  private readonly terminalKey: string;

  constructor(
    private readonly clientFactory: BankClientFactory,
    private readonly configService: ConfigService,
    private readonly cardEncryptionService: CardEncryptionService,
  ) {
    const isDev = this.configService.get('NODE_ENV') === 'development';
    this.baseUrl = isDev
      ? 'https://business.tbank.ru/openapi/sandbox/secured/api/v1/nominal-accounts/beneficiaries'
      : 'https://secured-openapi.tbank.ru/api/v1/nominal-accounts/beneficiaries';
    this.terminalKey = this.configService.getOrThrow('BANK_TERMINAL_KEY');
  }

  public async createBeneficiary(
    type: EnumBeneficiaryType,
    data: BeneficiaryDetailsValueObject,
  ): Promise<IBeneficiaryPortResult> {
    const requestData = BeneficiaryMapper.toTinkoffCreateBeneficiaryRequest(
      type,
      data,
    );
    const client = this.clientFactory.getBeneficiaryClient();

    const response = await client.request<ITinkoffCreateBeneficiaryResponse>({
      url: this.baseUrl,
      method: 'POST',
      data: requestData,
    });

    return BeneficiaryMapper.toCreateBeneficiaryPortResult(response);
  }

  public async getScoringStatus(
    beneficiaryId: string,
  ): Promise<IScoringStatusPortResult> {
    const client = this.clientFactory.getBeneficiaryClient();
    const params = { beneficiaryId, page: 1, limit: 1 };

    const response =
      await client.request<ITinkoffCheckBeneficiaryScoringResponse>({
        url: `${this.baseUrl}/scoring`,
        method: 'GET',
        params,
      });

    const first = response.result?.[0];
    if (!first)
      throw new Error(`No scoring data for beneficiary ${beneficiaryId}`);

    return BeneficiaryMapper.toGetScoringStatusPortResult(first);
  }

  public async getScoringStatuses(
    params: IScoringStatusQueryParams,
  ): Promise<IPaginatedScoringStatusResult> {
    const client = this.clientFactory.getBeneficiaryClient();

    const response =
      await client.request<ITinkoffCheckBeneficiaryScoringResponse>({
        url: `${this.baseUrl}/scoring`,
        method: 'GET',
        params,
      });

    const items = response.result.map((item) =>
      BeneficiaryMapper.toGetScoringStatusPortResult(item),
    );
    const total = parseInt(response.total, 10);
    const limit = parseInt(response.limit, 10);
    const offset = parseInt(response.offset, 10);
    const page = Math.floor(offset / limit) + 1;

    return { items, total, page, limit };
  }

  public async addBankDetails(
    beneficiaryId: string,
    type: EnumBankDetailsType,
    details:
      | IAddCardDetailsRequest
      | IAddSbpDetailsRequest
      | IAddPaymentDetailsRequest,
    isDefault: boolean,
  ): Promise<IBankDetailsPortResponse> {
    let requestData: ITinkoffCreateBankDetails;

    switch (type) {
      case EnumBankDetailsType.CARD: {
        const card = details as IAddCardDetailsRequest;
        const cardData = this.cardEncryptionService.encryptCardData(
          card.pan,
          card.expiryDate,
          card.cardHolder,
          card.cvv,
        );
        requestData = {
          type: EnumTinkoffBankDetailsType.CARD,
          terminalKey: this.terminalKey,
          cardData,
          isDefault,
        };
        break;
      }
      case EnumBankDetailsType.SBP: {
        const sbp = details as IAddSbpDetailsRequest;
        requestData = {
          type: EnumTinkoffBankDetailsType.SBP,
          terminalKey: this.terminalKey,
          phoneNumber: sbp.phoneNumber,
          bankId: sbp.bankId,
          isDefault,
        };
        break;
      }
      case EnumBankDetailsType.PAYMENT_DETAILS: {
        const payment = details as IAddPaymentDetailsRequest;
        requestData = {
          type: EnumTinkoffBankDetailsType.PAYMENT_DETAILS,
          bik: payment.bik,
          bankName: payment.bankName,
          accountNumber: payment.accountNumber,
          corrAccountNumber: payment.corrAccountNumber,
          inn: payment.inn,
          kpp: payment.kpp,
          name: payment.name,
          isDefault,
        };
        break;
      }
      default:
        throw new Error(`Unsupported bank details type: ${type}`);
    }

    const client = this.clientFactory.getBeneficiaryClient();
    const response = await client.request<ITinkoffBankDetailsResponse>({
      url: `${this.baseUrl}/${beneficiaryId}/bank-details`,
      method: 'POST',
      data: requestData,
    });

    return BeneficiaryMapper.toAddBankDetailsPortResult(response);
  }

  public async setDefaultBankDetails(
    beneficiaryId: string,
    bankDetailsId: string,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async deleteBankDetails(
    beneficiaryId: string,
    bankDetailsId: string,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async requestAddCard(
    beneficiaryId: string,
  ): Promise<IAddCardPortResult> {
    throw new Error('Method not implemented.');
  }
}
