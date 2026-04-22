export class MessageFiltersValueObject {
  constructor(
    public readonly senderId?: string,
    public readonly chatId?: string,
    public readonly text?: string,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date,
  ) {}
}
