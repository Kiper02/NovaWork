export class NotificationFiltersValueObject {
  constructor(
    public readonly body?: string,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date,
  ) {}
}
