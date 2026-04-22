import {
  ChatReadPort,
} from '../../../core/ports/chat/chat-read.port';
import { PrismaService } from '../database/orm/prisma-recource/prisma.service';
import { Injectable } from '@nestjs/common';
import { ChatBlock } from '../../../core/domain/value-objects/chat/chat-block.value-object';
import {
  EnumChatContext,
  EnumChatType,
} from '../../../core/domain/entities/chat/chat.entity';
import {
  IChatLastMessage,
  IChatWithLastMessageDto,
} from '../../../core/ports/chat/chat-read.types';
import { ChatFiltersValueObject } from '../../../core/domain/value-objects/chat/chat-filters.value.object';
import { PaginationParamsValueObject } from '../../../core/domain/value-objects/shared/pagination-params.value-object';
import { Prisma } from '@prisma/client';
import { PaginatedResultValueObject } from '../../../core/domain/value-objects/shared/paginated-result.value-object';

@Injectable()
export class ChatReadAdapter implements ChatReadPort {
  constructor(private readonly prismaService: PrismaService) {}

  async findChatsWithLastMessage(
    params: ChatFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<IChatWithLastMessageDto>> {
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.chat.findMany({
        where: { chatMembers: { some: { userId: params.memberId } } },
        include: {
          chatMembers: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                  profile: { select: { avatar: true } },
                },
              },
            },
          },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            include: {
              sender: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                  profile: { select: { avatar: true } },
                },
              },
            },
          },
        },
      }),
      this.prismaService.chat.count({
        where: { chatMembers: { some: { userId: params.memberId } } },
      }),
    ]);

    const chats = data.map((chat) => {
      let block: ChatBlock | null = null;
      if (chat.isBlocked) {
        block = new ChatBlock(
          chat.blockedAt!,
          chat.blockedByUserId!,
          chat.blockReason!,
          chat.blockExpiresAt ?? undefined,
        );
      }

      let lastMessage: IChatLastMessage | null = null;
      if (chat.messages[0]) {
        lastMessage = {
          id: chat.messages[0].id,
          text: chat.messages[0].text ?? null,
          files: chat.messages[0].fileKeys ?? null,
          createdAt: chat.messages[0].createdAt,
          sender: {
            id: chat.messages[0].sender.id,
            username: chat.messages[0].sender.username,
            email: chat.messages[0].sender.email,
            avatar: chat.messages[0].sender.profile?.avatar ?? undefined,
          },
        };
      }

      const chatWithLastMessage: IChatWithLastMessageDto = {
        id: chat.id,
        title: chat.title,
        type: chat.type as EnumChatType,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        context: chat.context as EnumChatContext | null,
        contextId: chat.contextId,
        block,
        lastMessage: lastMessage,
        participants: chat.chatMembers.map((member) => ({
          id: member.user.id,
          username: member.user.username,
          email: member.user.email,
          avatar: member.user.profile?.avatar ?? undefined,
        })),
      };
      return chatWithLastMessage;
    });
    return new PaginatedResultValueObject(chats, total, pagination);
  }

  private buildWhere(params: ChatFiltersValueObject) {
    const where: Prisma.ChatWhereInput = {};

    if (params.title) {
      where.title = params.title;
    }

    if (params.type) {
      where.type = params.type;
    }

    if (params.context) {
      where.context = params.context;
    }

    if (params.createdAtStart) {
      where.createdAt = {
        gte: params.createdAtStart,
      };
    }

    if (params.createdAtEnd) {
      where.createdAt = {
        lte: params.createdAtEnd,
      };
    }

    return where;
  }
}
