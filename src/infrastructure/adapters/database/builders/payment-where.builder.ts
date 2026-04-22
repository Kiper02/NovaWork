import { PaymentFiltersValueObject } from '../../../../core/domain/value-objects/payment/payment-filters.value.object';
import { Prisma } from '@prisma/client';

export class PaymentWhereBuilder {
  public static build(params: PaymentFiltersValueObject) {
    const where: Prisma.PaymentWhereInput = {}

    if(params.minAmount) {
      where.amount = {
        gte: params.minAmount
      }
    }

    if(params.maxAmount) {
      where.amount = {
        lte: params.maxAmount
      }
    }

    if(params.accountId) {
      where.accountId = params.accountId
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