export class TransactionEntity {
  public constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public readonly amount: number,
    public readonly type: EnumTransactionType,
    public status: EnumTransactionStatus,
    public readonly accountId: string,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}
}

export enum EnumTransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

export enum EnumTransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}
