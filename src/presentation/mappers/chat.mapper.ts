import { CreateChatDto } from '../dto/chat/create-chat.dto';
import { ICreateChatCommand } from '../../core/use-cases/chat/create/create-chat.command';
import { FindAllChatQueryDto } from '../dto/chat/find-all-chat-query.dto';
import { IFindAllChatCommand } from '../../core/use-cases/chat/find-all/find-all-chat.command';
import {
  ChatEntity,
} from '../../core/domain/entities/chat/chat.entity';
import { FindMyChatQueryDto } from '../dto/chat/find-my-chat-query.dto';
import { IFindMyChatCommand } from '../../core/use-cases/chat/find-my/find-my-chat.command';
import { ChatResponseDto } from '../dto/chat/chat-response.dto';
import {
  IChatLastMessage,
  IChatParticipant,
  IChatSender,
  IChatWithLastMessageDto,
} from '../../core/ports/chat/chat-read.types';
import { FindMyChatsResponseDto } from '../dto/chat/find-my-chats-response.dto';
import { ParticipantChatDto } from '../dto/chat/participant-chat.dto';
import { StoragePort } from '../../core/ports/storage/storage.port';
import { LastMessageDto } from '../dto/chat/last-message.dto';
import { MessageSenderDto } from '../dto/chat/message-sender.dto';
import { UpdateChatDto } from '../dto/chat/update-chat.dto';
import { IChatUpdateCommand } from '../../core/use-cases/chat/update/chat-update.command';
import { IFindChatByIdCommand } from '../../core/use-cases/chat/find-by-id/find-chat-by-id.command';


export class ChatMapper {
  public static toCreateCommand(
    userId: string,
    dto: CreateChatDto,
  ): ICreateChatCommand {
    return {
      userId: userId,
      title: dto.title,
      type: dto.type,
      context: dto.context,
      contextId: dto.contextId,
      membersIds: dto.membersIds,
    };
  }

  public static toUpdateCommand(chatId: string, userId: string, dto: UpdateChatDto): IChatUpdateCommand {
    return {
      chatId: chatId,
      userId: userId,
    }
  }

  public static toFindChatByIdCommand(chatId: string, userId: string): IFindChatByIdCommand {
    return {
      chatId: chatId,
      userId: userId,
    }
  }

  public static toFindAllCommand(
    query: FindAllChatQueryDto,
  ): IFindAllChatCommand {
    return {
      title: query.title,
      type: query.type,
      memberId: query.memberId,
      context: query.context,
      createdAtStart: query.createdAtStart,
      createdAtEnd: query.createdAtEnd,
      page: query.page,
      limit: query.limit,
    };
  }

  public static toFindMyChats(
    userId: string,
    query: FindMyChatQueryDto,
  ): IFindMyChatCommand {
    return {
      title: query.title,
      userId: userId,
      type: query.type,
      context: query.context,
      createdAtStart: query.createdAtStart,
      createdAtEnd: query.createdAtEnd,
      page: query.page,
      limit: query.limit,
    };
  }

  public static async toResponse(entity: ChatEntity): Promise<ChatResponseDto> {
    return {
      id: entity.id,
      title: entity.title,
      type: entity.type,
      context: entity.context,
      contextId: entity.contextId,
      members: entity.members,
      block: entity.block,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static async toFindMyChatsResponse(
    data: IChatWithLastMessageDto,
    storage: StoragePort,
  ): Promise<FindMyChatsResponseDto> {

    let lastMessage: LastMessageDto | null = null;
    let participants: ParticipantChatDto[] = []

    if(data.lastMessage) {
      lastMessage = await this.toLastMessageResponse(data.lastMessage, storage);
    }

    if(data.participants.length) {
      participants = await Promise.all(
        data.participants.map(async (participant) =>
          this.toParticipantResponse(participant, storage),
        ),
      );
    }

    return {
      id: data.id,
      title: data.title,
      type: data.type,
      context: data.context,
      contextId: data.contextId,
      lastMessage: lastMessage,
      participants: participants,
      block: data.block,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static async toLastMessageResponse(data: IChatLastMessage, storage: StoragePort): Promise<LastMessageDto> {
    let filesKeys: string[] = []

    if(data.files?.length) {
      filesKeys = await Promise.all(
        data.files.map(async (file) => storage.get(file)),
      );
    }

    const sender = await this.toResponseSenderMessage(data.sender, storage);

    return {
      id: data.id,
      sender: sender,
      text: data.text,
      files: filesKeys,
      createdAt: data.createdAt,
    }
  }

  public static async toResponseSenderMessage(data: IChatSender, storage: StoragePort): Promise<MessageSenderDto> {
    let avatarUrl: string | null = null;

    if (data.avatar) {
      avatarUrl = await storage.get(data.avatar);
    }

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      avatar: avatarUrl,
    };
  }

  public static async toParticipantResponse(data: IChatParticipant, storage: StoragePort): Promise<ParticipantChatDto> {
    let avatarUrl: string | null = null

    if(data.avatar) {
      avatarUrl = await storage.get(data.avatar);
    }

    return {
      id: data.id,
      username: data.username,
      email: data.email,
      avatar: avatarUrl
    }
  }
}
