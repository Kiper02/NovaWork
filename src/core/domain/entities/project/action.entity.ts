export class ActionEntity {
  public constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly execute: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}