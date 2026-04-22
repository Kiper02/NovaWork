export class WorkspaceEntity {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly userId: string,
    public readonly isDefault: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}