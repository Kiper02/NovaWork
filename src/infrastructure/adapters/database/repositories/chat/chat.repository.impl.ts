import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../../../../../core/domain/repositories/chat/chat.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { ChatEntity } from '../../../../../core/domain/entities/chat/chat.entity';
import { ChatMapper } from '../../mappers/chat/chat.mapper';
import { ChatFiltersValueObject } from '../../../../../core/domain/value-objects/chat/chat-filters.value.object';
import { PaginationParamsValueObject } from '../../../../../core/domain/value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../../../../core/domain/value-objects/shared/paginated-result.value-object';
import { EnumChatContext, Prisma } from '@prisma/client';


@Injectable()
export class ChatRepositoryImpl implements ChatRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: ChatEntity): Promise<ChatEntity> {
    return this.prismaService.$transaction(async (tx) => {
      const chatModel = ChatMapper.toModel(entity);
      const createdChat = await tx.chat.create({ data: chatModel });

      const memberModels = entity
        .getMembers()
        .map((m) => ChatMapper.toMemberModel(m));
      if (memberModels.length) {
        await tx.chatMember.createMany({ data: memberModels });
      }

      const fullChat = await tx.chat.findUnique({
        where: { id: createdChat.id },
        include: { chatMembers: true },
      });
      return ChatMapper.toEntity(fullChat!, fullChat!.chatMembers);
    });
  }
  public async update(
    id: string,
    data: Partial<Omit<ChatEntity, 'id' | 'createdAt'>>,
  ): Promise<ChatEntity> {
    return this.prismaService.$transaction(async (tx) => {
      const updateData = ChatMapper.toModelUpdate(data);
      await tx.chat.update({ where: { id }, data: updateData });

      if (data.members !== undefined) {
        const newMembers = data.members;
        const newMemberIds = newMembers.map((m) => m.userId);

        const currentMembers = await tx.chatMember.findMany({
          where: { chatId: id },
        });
        const currentMemberIds = currentMembers.map((m) => m.userId);

        const toRemove = currentMemberIds.filter(
          (uid) => !newMemberIds.includes(uid),
        );
        if (toRemove.length) {
          await tx.chatMember.deleteMany({
            where: { chatId: id, userId: { in: toRemove } },
          });
        }

        const toAdd = newMembers.filter(
          (m) => !currentMemberIds.includes(m.userId),
        );
        if (toAdd.length) {
          await tx.chatMember.createMany({
            data: toAdd.map((m) => ChatMapper.toMemberModel(m)),
          });
        }
      }

      const updatedChat = await tx.chat.findUnique({
        where: { id },
        include: { chatMembers: true },
      });
      return ChatMapper.toEntity(updatedChat!, updatedChat!.chatMembers);
    });
  }
  public async findAll(
    params: ChatFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<ChatEntity>> {
    const where = this.buildWhere(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.chat.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        include: { chatMembers: true }
      }),
      this.prismaService.chat.count({ where }),
    ]);

    const entities = data.map((record) =>
      ChatMapper.toEntity(record, record.chatMembers),
    );
    return new PaginatedResultValueObject(entities, total, pagination);
  }

  public async findByContextAndContextId(contextId:string, context: EnumChatContext): Promise<ChatEntity | null> {
    const chat = await this.prismaService.chat.findUnique({
      where: {
        context_contextId: { context, contextId },
      },
      include: { chatMembers: true },
    });
    if (!chat) return null;
    return ChatMapper.toEntity(chat, chat.chatMembers);
  }

  public async findById(id: string): Promise<ChatEntity | null> {
    const record = await this.prismaService.chat.findUnique({
      where: { id },
      include: { chatMembers: true },
    });
    if (!record) return null;
    return ChatMapper.toEntity(record, record.chatMembers);
  }

  private buildWhere(params: ChatFiltersValueObject) {
    const where: Prisma.ChatWhereInput = {};

    if(params.title) {
      where.title = params.title;
    }

    if(params.type) {
      where.type = params.type;
    }

    if(params.context) {
      where.context = params.context;
    }

    if(params.memberId) {
      where.chatMembers = {
        some: {
          userId: params.memberId,
        }
      }
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
