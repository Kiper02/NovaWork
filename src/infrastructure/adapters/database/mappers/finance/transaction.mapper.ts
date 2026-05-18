import { Transaction } from '@prisma/client';
import { TransactionEntity } from '../../../../../core/domain/entities/finance/transaction.entity';
import { Prisma } from '@prisma/client';

export class TransactionMapper {
  public static toEntity(model: Transaction): TransactionEntity {
    return new TransactionEntity(
      model.id,
      model.title,
      model.description,
      model.amount.toNumber(),
      model.type as any,
      model.status as any,
      model.accountId,
      model.createdAt,
      model.updatedAt,
    );
  }

  public static toModel(entity: TransactionEntity): Transaction {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      amount: Prisma.Decimal(entity.amount),
      type: entity.type as any,
      status: entity.status as any,
      accountId: entity.accountId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toModelUpdate(data: Partial<Omit<TransactionEntity, 'id' | 'createdAt'>>) {
    const result: Prisma.TransactionUpdateInput = {};

    if (data.type) result.type = data.type;
    if (data.amount) result.amount = Prisma.Decimal(data.amount);
    if (data.status) result.status = data.status;
    if (data.title) result.title = data.title;
    if (data.description) result.description = data.description;
    if (data.updatedAt) result.updatedAt = data.updatedAt;

    return result;
  }
}
