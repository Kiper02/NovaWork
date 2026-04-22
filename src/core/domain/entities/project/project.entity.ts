export class ProjectEntity {
  public constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly picture: string | null,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
