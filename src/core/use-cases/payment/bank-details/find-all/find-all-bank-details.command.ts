import { EnumBankDetailsType } from '../../../../domain/entities/finance/bank-details.entity';

export interface IFindAllBankDetailsCommand {
  beneficiaryId?: string;
  type?: EnumBankDetailsType;
  page: number;
  limit: number;
}