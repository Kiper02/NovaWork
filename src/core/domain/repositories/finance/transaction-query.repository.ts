import { StatisticsValueObject } from '../../value-objects/finance/statistics/statistics.value-object';
import { StatisticsFiltersValueObject } from '../../value-objects/finance/statistics/statistics-filters.value-object';

export abstract class TransactionQueryRepository {
  public abstract getStatistics(
    filters: StatisticsFiltersValueObject,
  ): Promise<StatisticsValueObject>;
}
