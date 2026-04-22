import { EnumChatContext, EnumChatType } from '../../entities/chat/chat.entity';

export class ChatFiltersValueObject {
  constructor(
    public readonly title?: string,
    public readonly type?: EnumChatType,
    public readonly memberId?: string,
    public readonly context?: EnumChatContext,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date,
  ) {}
}
