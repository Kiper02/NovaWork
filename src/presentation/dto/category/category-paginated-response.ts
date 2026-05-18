import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { CategoryResponseDto } from './category-response.dto';

export class CategoryPaginatedResponse {
  @ApiProperty({ type: [CategoryResponseDto] })
  data: CategoryResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
