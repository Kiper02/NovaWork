import {
  EnumChatContext,
  EnumChatType,
} from '../../domain/entities/chat/chat.entity';
import { ChatBlock } from '../../domain/value-objects/chat/chat-block.value-object';

export interface IChatSender {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface IChatParticipant {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}


export interface IChatLastMessage {
  id: string;
  text: string | null;
  files: string[] | null;
  createdAt: Date;
  sender: IChatSender;
}


export interface IChatWithLastMessageDto {
  id: string;
  title: string;
  type: EnumChatType;
  createdAt: Date;
  updatedAt: Date;
  context: EnumChatContext | null;
  contextId: string | null;
  block: ChatBlock | null;
  lastMessage: IChatLastMessage | null;
  participants: IChatParticipant[];
}
