import { type Bid, Prisma } from '@prisma/client';
import {
  BidEntity,
  EnumBidStatus,
} from '../../../../../core/domain/entities/project/bid.entity';

export class BidMapper {
  public static toEntity(model: Bid): BidEntity {
    return {
      id: model.id,
      userId: model.userId,
      taskId: model.taskId,
      coverLetter: model.coverLetter,
      status: model.status as EnumBidStatus,
      amount: model.amount.toNumber(),
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  public static toModel(entity: BidEntity): Bid {
    return {
      id: entity.id,
      userId: entity.userId,
      taskId: entity.taskId,
      coverLetter: entity.coverLetter,
      status: entity.status,
      amount: Prisma.Decimal(entity.amount),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toModelUpdate(
    data: Partial<Omit<BidEntity, 'id' | 'createdAt'>>,
  ): Prisma.BidUpdateInput {
    const result: Prisma.BidUpdateInput = {};

    if (data.amount) result.amount = data.amount;
    if (data.coverLetter) result.coverLetter = data.coverLetter;
    if (data.updatedAt) result.updatedAt = data.updatedAt;
    if (data.status) result.status = data.status;

    return result;
  }
}
