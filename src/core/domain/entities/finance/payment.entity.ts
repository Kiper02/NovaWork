export class PaymentEntity {
  public constructor(
    public readonly id: string,
    public amount: number,
    public status: EnumPaymentStatus,
    public currency: EnumPaymentCurrency,
    public accountId: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public externalId: string | null
  ) {}
}

export enum EnumPaymentStatus {
  PENDING = 'PENDING',
  SUCCEED = 'SUCCEED',
  FAILED = 'FAILED',
}

export enum EnumPaymentCurrency {
  RUB = 'RUB',
}
