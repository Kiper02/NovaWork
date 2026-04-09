export class PaginationParamsValueObject {
  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {
    if (!Number.isInteger(page) || page < 1) {
      throw new Error('Page must be a positive integer');
    }
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw new Error('Limit must be between 1 and 100');
    }
  }

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  get take(): number {
    return this.limit;
  }
}
