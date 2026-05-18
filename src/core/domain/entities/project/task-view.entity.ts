export class TaskViewEntity {
  public constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly taskId: string,
    public readonly viewedAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
