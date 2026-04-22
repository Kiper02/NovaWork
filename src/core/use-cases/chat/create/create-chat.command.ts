import {
  EnumChatContext,
  EnumChatType,
} from '../../../domain/entities/chat/chat.entity';

export interface ICreateChatCommand {
  userId: string;
  title: string;
  type: EnumChatType,
  context?: EnumChatContext
  contextId?: string;
  membersIds: string[]
}