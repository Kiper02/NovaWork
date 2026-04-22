import {
  EnumNotificationType,
  NotificationEntity,
} from '../../../../../core/domain/entities/shared/notification.entity';
import { Notification, Prisma } from '@prisma/client';

export class NotificationMapper {
  static toEntity(model: Notification): NotificationEntity {
    return new NotificationEntity(
      model.id,
      model.title,
      model.body,
      model.type as EnumNotificationType,
      model.metadata as Record<string, any>,
      model.createdAt,
      model.updatedAt
    )
  }
  
  static toModel(entity: NotificationEntity): Prisma.NotificationCreateInput {
    return {
      id: entity.id,
      title: entity.title,
      body: entity.body,
      type: entity.type,
      metadata: entity.metadata,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toUpdateModel(data: Partial<Omit<NotificationEntity, 'id' | 'createdAt'>>) {
    const result: Prisma.NotificationUpdateInput = {}

    if(data.title) result.title = data.title;
    if(data.body) result.body = data.body;
    if(data.metadata) result.metadata = data.metadata;
    if(data.updatedAt) result.updatedAt = data.updatedAt;

    return result;
  }
}