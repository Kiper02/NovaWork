import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { BidResponseDto } from './bid-response.dto';

export class BidPaginatedResponse {
  @ApiProperty({ type: [BidResponseDto] })
  data: BidResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
