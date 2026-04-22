export class ServiceFiltersValueObject {
  constructor(
    public readonly title?: string,
    public readonly description?: string,
    public readonly isPublished?: boolean,
    public readonly userId?: string,
    public readonly minPrice?: number,
    public readonly maxPrice?: number,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date,
  ) {}
}
