import { Account } from '@prisma/client';
import { AccountEntity } from '../../../core/domain/entities/account.entity';
import { Prisma } from '@prisma/client';

export class AccountMapper {
  public static toEntity(model: Account): AccountEntity {
    return {
      id: model.id,
      availableBalance: model.availableBalance.toNumber(),
      frozenBalance: model.frozenBalance.toNumber(),
      userId: model.userId,
    };
  }

  public static toModel(entity: AccountEntity): Account {
    return {
      id: entity.id,
      availableBalance: Prisma.Decimal(entity.availableBalance),
      frozenBalance: Prisma.Decimal(entity.frozenBalance),
      userId: entity.userId,
    };
  }

  public static toModelUpdate(data: Partial<Omit<AccountEntity, 'id'>>): Prisma.AccountUpdateInput {
    const result: Prisma.AccountUpdateInput = {};
    if (data.availableBalance !== undefined) result.availableBalance = new Prisma.Decimal(data.availableBalance);
    if (data.frozenBalance !== undefined) result.frozenBalance = new Prisma.Decimal(data.frozenBalance);
    return result;
  }
}
