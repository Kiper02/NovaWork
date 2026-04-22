export class ProjectFiltersValueObject {
  constructor(
    public readonly userId?: string,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date
  ) {}
}
