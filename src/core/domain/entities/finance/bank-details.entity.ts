import { BankDetailsValueObject } from '../../value-objects/bank-details/bank-details.value-object';

export class BankDetailsEntity {
  constructor(
    public readonly id: string,
    public readonly beneficiaryId: string,
    public readonly type: EnumBankDetailsType,
    public readonly details: BankDetailsValueObject,
    public readonly isDefault: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
}

export enum EnumBankDetailsType {
  CARD = 'CARD',
  SBP = 'SBP',
  PAYMENT_DETAILS = 'PAYMENT_DETAILS',
}
