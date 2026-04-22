export class NotificationEntity {
  public constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly body: string,
    public readonly type: EnumNotificationType,
    public readonly metadata: Record<string, any>,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

export enum EnumNotificationType {
  BID_ACCEPTED = 'BID_ACCEPTED',
  BID_REJECTED = 'BID_REJECTED',
}