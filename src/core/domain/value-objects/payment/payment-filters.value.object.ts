export class PaymentFiltersValueObject {
  constructor(
    public readonly minAmount?: number,
    public readonly maxAmount?: number,
    public readonly accountId?: string,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date,
  ) {}
}
