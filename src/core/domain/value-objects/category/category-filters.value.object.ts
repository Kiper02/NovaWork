export class CategoryFiltersValueObject {
  constructor(
    public readonly name?: string,
    public readonly parentId?: string,
    public readonly tags?: string[],
  ) {}
}
