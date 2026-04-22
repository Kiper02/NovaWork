import { EnumBeneficiaryType } from '../../../../domain/entities/finance/beneficiary.entity';

export interface IFindAllBeneficiaryCommand {
  accountId?: string;
  type?: EnumBeneficiaryType;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  page: number;
  limit: number
}