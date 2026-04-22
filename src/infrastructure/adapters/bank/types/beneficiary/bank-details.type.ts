import { ITinkoffCardData } from '../common/card-data.type';

export enum EnumTinkoffBankDetailsType {
  PAYMENT_DETAILS = 'PAYMENT_DETAILS',
  CARD = 'CARD',
  SBP = 'SBP',
}

export interface ITinkoffBaseBankDetails {
  type: EnumTinkoffBankDetailsType;
  isDefault?: boolean;
}

export interface ITinkoffPaymentDetails extends ITinkoffBaseBankDetails {
  type: EnumTinkoffBankDetailsType.PAYMENT_DETAILS;
  bik: string;
  kpp?: string;
  inn?: string;
  name?: string;
  bankName: string;
  accountNumber: string;
  corrAccountNumber: string;
}

export interface ITinkoffCardDetails extends ITinkoffBaseBankDetails {
  type: EnumTinkoffBankDetailsType.CARD;
  cardData: string;
  terminalKey: string;
}

export interface ITinkoffSbpDetails extends ITinkoffBaseBankDetails {
  type: EnumTinkoffBankDetailsType.SBP;
  phoneNumber: string;
  bankId: string;
  terminalKey: string;
}

export type ITinkoffCreateBankDetails =
  | ITinkoffPaymentDetails
  | ITinkoffCardDetails
  | ITinkoffSbpDetails;

export type ITinkoffBankDetailsResponse = ITinkoffCreateBankDetails & {
  beneficiaryId: string;
  bankDetailsId: string;
};
