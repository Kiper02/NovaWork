export class CategoryEntity {
  public constructor(
    public readonly id: string,
    public name: string,
    public parentId: string | null,
    public childrenIds: string[],
    public description: string | null,
    public tags: string[]
  ) {}
}