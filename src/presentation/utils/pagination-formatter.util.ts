import {
  PaginatedResponseDto,
  PaginationMetaDto,
} from '../dto/shared/pagination-meta.dto';
import { PaginatedResultValueObject } from '../../core/domain/value-objects/shared/paginated-result.value-object';

export class PaginationFormatterUtil {
  static format<T, R>(
    paginatedResult: PaginatedResultValueObject<T>,
    mapper: (entity: T) => R,
  ): PaginatedResponseDto<R> {
    const data = paginatedResult.data.map(mapper);
    const meta: PaginationMetaDto = {
      page: paginatedResult.params.page,
      limit: paginatedResult.params.limit,
      total: paginatedResult.total,
      totalPages: paginatedResult.totalPages,
      hasNext: paginatedResult.hasNext,
      hasPrev: paginatedResult.hasPrev,
    };
    const response = new PaginatedResponseDto<R>();
    response.data = data;
    response.meta = meta;
    return response;
  }
}
