export class BidFiltersValueObject {
  constructor(
    public readonly userId?: string,
    public readonly taskId?: string,
    public readonly amountStart?: number,
    public readonly amountEnd?: number,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date
  ) {}
}
