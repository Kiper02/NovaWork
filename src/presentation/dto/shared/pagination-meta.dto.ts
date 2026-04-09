import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({ description: 'Текущая страница', example: 1 })
  page: number;

  @ApiProperty({ description: 'Количество элементов на странице', example: 20 })
  limit: number;

  @ApiProperty({ description: 'Общее количество элементов', example: 150 })
  total: number;

  @ApiProperty({ description: 'Общее количество страниц', example: 8 })
  totalPages: number;

  @ApiProperty({ description: 'Есть ли следующая страница', example: true })
  hasNext: boolean;

  @ApiProperty({ description: 'Есть ли предыдущая страница', example: false })
  hasPrev: boolean;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'Массив элементов' })
  data: T[];

  @ApiProperty({ description: 'Метаданные пагинации' })
  meta: PaginationMetaDto;
}
