import { Prisma } from '@prisma/client';
import { CommissionRuleFiltersValueObject } from '../../../../core/domain/value-objects/commission-rule/commission-rule-filters.value.object';

export class CommissionRuleWhereBuilder {
  public static build(params: CommissionRuleFiltersValueObject) {
    const where: Prisma.CommissionRuleWhereInput = {};

    if (params.name) {
      where.name = {
        contains: params.name,
        mode: 'insensitive',
      };
    }

    return where;
  }
}
