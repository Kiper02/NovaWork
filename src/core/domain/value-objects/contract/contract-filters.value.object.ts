export class ContractFiltersValueObject {
  constructor(
    public readonly amountMin?: number,
    public readonly amountMax?: number,
    public readonly clientId?: string,
    public readonly contractorId?: string,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date,
    public readonly taskId?: string,
    public readonly serviceId?: string,
    public readonly userId?: string,
  ) {}
}
