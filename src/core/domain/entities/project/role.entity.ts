export class RoleEntity {
  public constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}