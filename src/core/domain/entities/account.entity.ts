export class AccountEntity {
  public constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly availableBalance: number,
    public readonly frozenBalance: number
  ) {
  }
}