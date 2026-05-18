export class StatisticsValueObject {
  public constructor(
    public readonly income: number,
    public readonly expense: number,
    public readonly percent: number,
  ) {}
}