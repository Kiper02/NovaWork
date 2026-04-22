import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../../../../../core/domain/repositories/chat/message.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { MessageEntity } from 'src/core/domain/entities/chat/message.entity';
import { MessageFiltersValueObject } from 'src/core/domain/value-objects/message/message-filters.value.object';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { MessageMapper } from '../../mappers/chat/message.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessageRepositoryImpl implements MessageRepository {
  public constructor(private readonly prismaService: PrismaService) {}
  public async save(entity: MessageEntity): Promise<MessageEntity> {
    const model = MessageMapper.toModel(entity);
    const record = await this.prismaService.message.create({ data: model })
    return MessageMapper.toEntity(record)
  }
  public async update(
    id: string,
    data: Partial<Omit<MessageEntity, 'id' | 'createdAt'>>,
  ): Promise<MessageEntity> {
    const model = MessageMapper.toModelUpdate(data);
    const record = await this.prismaService.message.update({
      where: {
        id
      },
      data: model
    })

    return MessageMapper.toEntity(record)
  }
  public async findAll(
    params: MessageFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<MessageEntity>> {
    const where = this.buildWhere(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.message.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.message.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(MessageMapper.toEntity),
      total,
      pagination,
    );
  }
  public async findById(id: string): Promise<MessageEntity | null> {
    const record = await this.prismaService.message.findUnique({where: {id}})
    if(!record) return null;

    return MessageMapper.toEntity(record);
  }

  private buildWhere(params: MessageFiltersValueObject) {
    const where: Prisma.MessageWhereInput = {};

    if(params.text) {
      where.text = {
        contains: params.text,
        mode: 'insensitive'
      }
    }

    if(params.chatId) {
      where.chatId = params.chatId;
    }

    if(params.senderId) {
      where.senderId = params.senderId;
    }

    if(params.createdAtStart) {
      where.createdAt = {
        gte: params.createdAtStart
      }
    }

    if(params.createdAtEnd) {
      where.createdAt = {
        lte: params.createdAtEnd
      }
    }

    return where;
  }
}