import { PaginationParamsValueObject } from './pagination-params.value-object';

export class PaginatedResultValueObject<T> {
  constructor(
    public readonly data: T[],
    public readonly total: number,
    public readonly params: PaginationParamsValueObject,
  ) {}

  get totalPages(): number {
    return Math.ceil(this.total / this.params.limit);
  }

  get hasNext(): boolean {
    return this.params.page < this.totalPages;
  }

  get hasPrev(): boolean {
    return this.params.page > 1;
  }
}
