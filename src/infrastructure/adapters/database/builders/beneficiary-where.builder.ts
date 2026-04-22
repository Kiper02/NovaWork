import { Prisma } from '@prisma/client';
import {
  BeneficiaryFiltersValueObject
} from '../../../../core/domain/value-objects/beneficiary/beneficiary-filters.value.object';

export class BeneficiaryWhereBuilder {
  public static build(params: BeneficiaryFiltersValueObject) {
    const where: Prisma.BeneficiaryWhereInput = {}

    if (params.accountId) {
      where.accountId = params.accountId;
    }

    if (params.type) {
      where.type = params.type;
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