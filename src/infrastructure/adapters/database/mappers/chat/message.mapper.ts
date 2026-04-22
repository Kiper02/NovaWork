import type { Message, Prisma } from '@prisma/client';
import type { MessageEntity } from '../../../../../core/domain/entities/chat/message.entity';

export class MessageMapper {
  public static toEntity(model: Message): MessageEntity {
    return {
      id: model.id,
      text: model.text ?? null,
      files: model.fileKeys,
      chatId: model.chatId,
      senderId: model.senderId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  public static toModel(entity: MessageEntity): Message {
    return {
      id: entity.id,
      text: entity.text ?? null,
      fileKeys: entity.files ?? [],
      chatId: entity.chatId,
      senderId: entity.senderId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toModelUpdate(
    data: Partial<Omit<MessageEntity, 'id' | 'createdAt'>>,
  ): Prisma.MessageUpdateInput {
    const result: Prisma.MessageUpdateInput = {};

    if(data.files) result.fileKeys = data.files;
    if(data.text) result.text = data.text;
    if(data.updatedAt) result.updatedAt = data.updatedAt;

    return result;
  }
}
