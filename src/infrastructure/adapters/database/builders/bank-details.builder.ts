import { Prisma } from '@prisma/client';
import {
  BankDetailsFiltersValueObject
} from '../../../../core/domain/value-objects/bank-details/bank-details-filters.value.object';


export class BankDetailsBuilder {
  public static build(params: BankDetailsFiltersValueObject) {
    const where: Prisma.BankDetailsWhereInput = {}

    if (params.beneficiaryId) {
      where.beneficiaryId = params.beneficiaryId;
    }

    if (params.type) {
      where.type = params.type;
    }
    return where;
  }
}