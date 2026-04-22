import { EnumBankDetailsType } from '../../../../domain/entities/finance/bank-details.entity';

export interface IBankDetailsPortResponse {
  beneficiaryId: string;
  bankDetailsId: string;
  isDefault: boolean;
  cardId?: string;
  type: EnumBankDetailsType;
}

export interface IAddCardDetailsRequest {
  pan: string;
  expiryDate: string;
  cardHolder?: string;
  cvv?: string;
  cardId?: string;
}

export interface IAddSbpDetailsRequest {
  phoneNumber: string;
  bankId: string;
}

export interface IAddPaymentDetailsRequest {
  bik: string;
  bankName: string;
  accountNumber: string;
  corrAccountNumber: string;
  inn?: string;
  kpp?: string;
  name?: string;
}
