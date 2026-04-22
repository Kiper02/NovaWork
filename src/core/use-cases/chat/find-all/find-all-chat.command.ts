import { EnumChatContext, EnumChatType } from '../../../domain/entities/chat/chat.entity';

export interface IFindAllChatCommand {
  title?: string,
  type?: EnumChatType,
  memberId?: string,
  context?: EnumChatContext,
  createdAtStart?: Date,
  createdAtEnd?: Date,
  page: number,
  limit: number
}