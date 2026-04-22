import { EnumBankDetailsType } from '../../../../domain/entities/finance/bank-details.entity';

export interface ICreateBankDetailsCommand {
  beneficiaryId: string;
  type: EnumBankDetailsType;
  isDefault: boolean;
  card?: {
    pan: string;
    expiryDate: string;
    cardHolder?: string;
    cvv?: string;
  };
  sbp?: {
    phoneNumber: string;
    bankId: string;
  };
  payment?: {
    bik: string;
    bankName: string;
    accountNumber: string;
    corrAccountNumber: string;
    inn?: string;
    kpp?: string;
    name?: string;
  };
}
