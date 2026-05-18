import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { TransactionResponseDto } from './transaction-response.dto';

export class TransactionPaginatedResponse {
  @ApiProperty({ type: [TransactionResponseDto] })
  data: TransactionResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
