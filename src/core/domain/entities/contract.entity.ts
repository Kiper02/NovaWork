export class ContractEntity {
  public constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly clientId: string,
    public readonly contractorId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly taskId?: string,
    public readonly serviceId?: string,
  ) {}
}