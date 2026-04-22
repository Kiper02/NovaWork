import { type Prisma, Subscription } from '@prisma/client';
import { SubscriptionEntity } from '../../../../../core/domain/entities/shared/subscription.entity';

export class SubscriptionMapper {
  public static toEntity(model: Subscription): SubscriptionEntity {
    return {
      id: model.id,
      startDate: model.startDate,
      endDate: model.endDate,
      autoRenew: model.autoRenew,
      accountId: model.accountId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  public static toModel(entity: SubscriptionEntity): Subscription {
    return {
      id: entity.id,
      startDate: entity.startDate,
      endDate: entity.endDate,
      autoRenew: entity.autoRenew,
      accountId: entity.accountId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toModelUpdate(data: Partial<Omit<SubscriptionEntity, 'id' | 'createdAt'>>): Prisma.SubscriptionUpdateInput {
    const result: Prisma.SubscriptionUpdateInput = {};

    if(data.startDate !== undefined) result.startDate = data.startDate;
    if(data.endDate !== undefined) result.endDate = data.endDate;
    if(data.autoRenew !== undefined) result.autoRenew = data.autoRenew;
    if(data.updatedAt !== undefined) result.updatedAt = data.updatedAt;

    return result;
  }
}
