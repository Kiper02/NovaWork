import { Injectable } from '@nestjs/common';
import { TransactionQueryRepository } from '../../../domain/repositories/finance/transaction-query.repository';
import { AccountRepository } from '../../../domain/repositories/finance/account.repository';
import { IGetStatisticsCommand } from './get-statistics.command';
import { AccountNotFoundException } from '../../../domain/exceptions/account/account-not-found.exception';
import { StatisticsFiltersValueObject } from '../../../domain/value-objects/finance/statistics/statistics-filters.value-object';
import { StatisticsValueObject } from '../../../domain/value-objects/finance/statistics/statistics.value-object';

@Injectable()
export class GetStatisticsUseCase {
  public constructor(
    private readonly transactionQueryRepository: TransactionQueryRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  public async execute(command: IGetStatisticsCommand) {
    const account = await this.accountRepository.findByUserId(command.userId);
    if (!account) {
      throw new AccountNotFoundException();
    }

    const filters = new StatisticsFiltersValueObject(
      account.id,
      command.startDate ? new Date(command.startDate) : undefined,
      command.endDate ? new Date(command.endDate) : undefined,
    );

    const statsVO =
      await this.transactionQueryRepository.getStatistics(filters);

    const percent =
      statsVO.income > 0
        ? ((statsVO.income - statsVO.expense) / statsVO.income) * 100
        : 0;

    return new StatisticsValueObject(
      statsVO.income,
      statsVO.expense,
      percent,
    );
  }
}
