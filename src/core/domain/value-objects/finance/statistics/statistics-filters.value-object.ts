export class StatisticsFiltersValueObject {
 public constructor(
   public readonly accountId: string,
   public readonly startDate?: Date,
   public readonly endDate?: Date,
 ) {
 }
}