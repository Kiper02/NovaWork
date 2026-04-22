export class BidEntity {
  public constructor(
    public readonly id: string,
    public readonly coverLetter: string,
    public readonly amount: number,
    public readonly status: EnumBidStatus = EnumBidStatus.VIEWED,
    public readonly userId: string,
    public readonly taskId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export enum EnumBidStatus {
  VIEWED = 'VIEWED',
  NOT_VIEWED = 'NOT_VIEWED',
  REJECT = 'REJECT',
  ACCEPTED = 'ACCEPTED',
}
