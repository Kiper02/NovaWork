import { Payment, Prisma } from '@prisma/client';
import {
  EnumPaymentCurrency,
  EnumPaymentStatus,
  PaymentEntity,
} from '../../../../../core/domain/entities/finance/payment.entity';

export class PaymentMapper {
  public static toEntity(model: Payment): PaymentEntity {
    return new PaymentEntity(
      model.id, 
      model.amount.toNumber(),
      model.status as EnumPaymentStatus,
      model.currency as EnumPaymentCurrency,
      model.accountId,
      model.createdAt,
      model.updatedAt,
      model.externalId
    )
  }

  public static toModel(entity: PaymentEntity): Prisma.PaymentCreateInput {
    return {
      id: entity.id,
      amount: entity.amount,
      currency: entity.currency,
      status: entity.status,
      externalId: entity.externalId,
      account: {
        connect: {
          id: entity.accountId,
        },
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toUpdate(data: Partial<Omit<PaymentEntity, 'id' | 'createdAt'>>): Prisma.PaymentUpdateInput {
    const result: Prisma.PaymentUpdateInput = {}

    if(data.amount) result.amount = Number(data.amount);
    if(data.currency) result.currency = data.currency;
    if(data.status) result.status = data.status;
    if(data.externalId) result.externalId = data.externalId;
    if(data.updatedAt) result.updatedAt = data.updatedAt

    return result
  }
}