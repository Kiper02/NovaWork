import { CommissionRule, Prisma } from '@prisma/client';
import {
  CommissionRuleEntity,
  EnumCalculationType,
  EnumEntityType,
} from '../../../../../core/domain/entities/finance/commission-rule.entity';

export class CommissionRuleMapper {
  public static toEntity(model: CommissionRule): CommissionRuleEntity {
    return new CommissionRuleEntity(
      model.id,
      model.name,
      model.entityType as EnumEntityType,
      model.calculationType as EnumCalculationType,
      model.value,
      model.minAmount,
      model.maxAmount,
      model.isSubscription,
      model.categoryId,
      model.isActive,
      model.priority,
      model.validFrom,
      model.validTo,
      model.createdAt,
      model.updatedAt
    )
  }

  public static toModel(entity: CommissionRuleEntity): Prisma.CommissionRuleCreateInput {
    const query: Prisma.CommissionRuleCreateInput = {
      id: entity.id,
      name: entity.name,
      entityType: entity.entityType,
      calculationType: entity.calculationType,
      value: entity.value,
      minAmount: entity.minAmount,
      maxAmount: entity.maxAmount,
      isActive: entity.isActive,
      priority: entity.priority,
      validFrom: entity.validFrom,
      isSubscription: entity.isSubscription,
      validTo: entity.validTo,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }

    if (entity.categoryId) {
      query.category = {
        connect: {
          id: entity.categoryId
        }
      }
    }

    return query;
  }

  public static toUpdateModel(data: Partial<Omit<CommissionRuleEntity, 'id'>>) {
    const result: Prisma.CommissionRuleUpdateInput = {};

    if (data.name) result.name = data.name;
    if (data.entityType) result.entityType = data.entityType;
    if (data.value) result.value = data.value;
    if (data.minAmount) result.minAmount = data.minAmount;
    if (data.maxAmount) result.maxAmount = data.maxAmount;
    if (data.validFrom) result.validFrom = data.validFrom;
    if (data.validTo) result.validTo = data.validTo;
    if (data.priority) result.priority = data.priority;
    if (data.isActive) result.isActive = data.isActive;
    if (data.isSubscription) result.isSubscription = data.isSubscription;

    return result
  }
}