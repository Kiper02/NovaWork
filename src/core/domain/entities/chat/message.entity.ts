export class MessageEntity {
  public constructor(
    public readonly id: string,
    public readonly chatId: string,
    public readonly senderId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly text: string | null,
    public readonly files: string[],
  ) {}
}