import { EnumChatContext, EnumChatType } from '../../../domain/entities/chat/chat.entity';

export interface IFindMyChatCommand {
  title?: string,
  type?: EnumChatType,
  userId: string,
  context?: EnumChatContext,
  createdAtStart?: Date,
  createdAtEnd?: Date,
  page: number,
  limit: number
}