import type { Chat, ChatMember, Prisma } from '@prisma/client';
import {
  ChatEntity,
  EnumChatContext,
  EnumChatType,
} from '../../../../../core/domain/entities/chat/chat.entity';
import { ChatBlock } from '../../../../../core/domain/value-objects/chat/chat-block.value-object';
import { ChatMemberEntity } from '../../../../../core/domain/entities/chat/chat-member.entity';

export class ChatMapper {
  public static toEntity(model: Chat, members: ChatMember[]): ChatEntity {
    let block: ChatBlock | null = null;
    if (model.isBlocked) {
      block = new ChatBlock(
        model.blockedAt!,
        model.blockedByUserId!,
        model.blockReason!,
        model.blockExpiresAt!,
      );
    }

    const memberEntities = members.map(
      (member) =>
        new ChatMemberEntity(
          member.id,
          member.chatId,
          member.userId,
          member.createdAt,
          member.updatedAt,
        ),
    );

    return new ChatEntity(
      model.id,
      model.title,
      model.type as EnumChatType,
      memberEntities,
      model.createdAt,
      model.updatedAt,
      block,
      model.context as EnumChatContext ?? null,
      model.contextId ?? null
    );
  }

  public static toModel(entity: ChatEntity): Chat {
    return {
      id: entity.id,
      title: entity.title,
      type: entity.type,
      context: entity.context ?? null,
      contextId: entity.contextId ?? null,
      isBlocked: !!entity.block,
      blockedAt: entity.block?.blockedAt ?? null,
      blockedByUserId: entity.block?.blockedByUserId ?? null,
      blockReason: entity.block?.reason ?? null,
      blockExpiresAt: entity.block?.expiresAt ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toModelUpdate(
    data: Partial<Omit<ChatEntity, 'id' | 'createdAt'>>,
  ): Prisma.ChatUpdateInput {
    const result: Prisma.ChatUpdateInput = {};

    if (data.title) result.title = data.title;
    if (data.context) result.context = data.context;
    if (data.type) result.type = data.type;
    if (data.updatedAt) result.updatedAt = data.updatedAt;

    if (data.block) {
      result.isBlocked = !!data.block;
      if (data.block.reason) result.blockReason = data.block.reason;
      if (data.block.blockedAt) result.blockedAt = data.block.blockedAt;
      if (data.block.expiresAt) result.blockExpiresAt = data.block.expiresAt;
    }

    return result;
  }

  public static toMemberModel(entity: ChatMemberEntity) {
    return {
      id: entity.id,
      chatId: entity.chatId,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
