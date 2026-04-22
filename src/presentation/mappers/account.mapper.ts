import { UpdateAccountDto } from '../dto/account/update-account.dto';
import { IUpdateAccountCommand } from '../../core/use-cases/account/update/update-account.command';
import { AccountEntity } from '../../core/domain/entities/finance/account.entity';
import { AccountResponseDto } from '../dto/account/account-response.dto';
import { CreateAccountDto } from '../dto/account/create-account.dto';
import { ICreateAccountCommand } from '../../core/use-cases/account/create-account/create-account.command';
import { IFindAllAccountCommand } from '../../core/use-cases/account/find-all/find-all-account.command';
import { FindAllAccountQueryDto } from '../dto/account/find-all-account-query.dto';
import { IFindMyAccountCommand } from '../../core/use-cases/account/find-my/find-my-account.command';

export class AccountMapper {
  public static toCreateCommand(dto: CreateAccountDto): ICreateAccountCommand {
    return {
      userId: dto.userId,
    }
  }

  public static toUpdateCommand(dto: UpdateAccountDto): IUpdateAccountCommand {
    return {
      userId: dto.userId,
      availableBalance: dto.availableBalance,
      frozenBalance: dto.frozenBalance
    };
  }

  public static toFindAllCommand(dto: FindAllAccountQueryDto): IFindAllAccountCommand {
    return {
      page: dto.page,
      limit: dto.limit,
      userId: dto.userId,
    }
  }

  public static toFindMyCommand(userId: string): IFindMyAccountCommand {
    return {
      userId: userId,
    }
  }

  public static toResponse(entity: AccountEntity): AccountResponseDto {
    return {
      id: entity.id,
      availableBalance: entity.availableBalance,
      frozenBalance: entity.frozenBalance,
      userId: entity.userId,
      storageQuotaBytes: Number(entity.storageQuotaBytes),
      storageUsedBytes: Number(entity.storageUsedBytes),
    };
  }
}
