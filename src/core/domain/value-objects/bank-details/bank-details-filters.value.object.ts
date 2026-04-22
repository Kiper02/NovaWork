import { EnumBankDetailsType } from '../../entities/finance/bank-details.entity';

export class BankDetailsFiltersValueObject {
  constructor(
    public readonly beneficiaryId?: string,
    public readonly type?: EnumBankDetailsType,
  ) {}
}
