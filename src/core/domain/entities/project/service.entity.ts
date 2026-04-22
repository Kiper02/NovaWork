export class ServiceEntity {
  public constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly price: number,
    public readonly isPublished: boolean,
    public readonly userId: string,
    public readonly workspaceId: string,
    public readonly categoryIds: string[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}