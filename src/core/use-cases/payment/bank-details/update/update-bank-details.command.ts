import { BankDetailsValueObject } from '../../../../domain/value-objects/bank-details/bank-details.value-object';
import { EnumBankDetailsType } from '../../../../domain/entities/finance/bank-details.entity';

export interface IUpdateBankDetailsCommand {
  bankDetailsId: string;
  type?: EnumBankDetailsType
  details?: BankDetailsValueObject
  isDefault?: boolean;
  userId: string
}