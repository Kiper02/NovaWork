import { Account } from '@prisma/client';
import { AccountEntity } from '../../../../../core/domain/entities/finance/account.entity';
import { Prisma } from '@prisma/client';

export class AccountMapper {
  public static toEntity(model: Account): AccountEntity {
    return new AccountEntity(
      model.id,
      model.userId,
      model.availableBalance.toNumber(),
      model.frozenBalance.toNumber(),
      BigInt(model.storageQuotaBytes),
      BigInt(model.storageUsedBytes),
    );
  }

  public static toModel(entity: AccountEntity): Account {
    return {
      id: entity.id,
      availableBalance: Prisma.Decimal(entity.availableBalance),
      frozenBalance: Prisma.Decimal(entity.frozenBalance),
      storageQuotaBytes: entity.storageQuotaBytes,
      storageUsedBytes: entity.storageUsedBytes,
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
