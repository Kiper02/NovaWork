export class SubscriptionEntity {
  public constructor(
    public readonly id: string,

    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly autoRenew: boolean,

    public readonly accountId: string,

    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}