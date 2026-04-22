export class ChatMemberEntity {
  constructor(
    public readonly id: string,
    public readonly chatId: string,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}