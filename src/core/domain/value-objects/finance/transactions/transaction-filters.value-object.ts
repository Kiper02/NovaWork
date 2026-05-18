import {
  EnumTransactionStatus,
  EnumTransactionType,
} from '../../../entities/finance/transaction.entity';

export class TransactionFiltersValueObject {
  public constructor(
    public readonly accountId?: string,
    public readonly startDate?: Date,
    public readonly endDate?: Date,
    public readonly type?: EnumTransactionType,
    public readonly status?: EnumTransactionStatus,
  ) {}

  public hasDateRange(): boolean {
    return !!this.startDate && !!this.endDate;
  }
}
