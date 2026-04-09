export class SubscriptionFiltersValueObject {
  constructor(
    public readonly accountId?: string,
    public readonly startDate?: Date,
    public readonly endDate?: Date,
    public readonly autoRenew?: boolean,
  ) {}
}
