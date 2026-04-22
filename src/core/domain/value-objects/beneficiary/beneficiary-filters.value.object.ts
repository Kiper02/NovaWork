import { EnumBeneficiaryType } from '../../entities/finance/beneficiary.entity';

export class BeneficiaryFiltersValueObject {
  constructor(
    public readonly accountId?: string,
    public readonly type?: EnumBeneficiaryType,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date
  ) {}
}
