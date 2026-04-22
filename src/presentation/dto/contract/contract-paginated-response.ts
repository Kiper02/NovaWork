import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { ContractResponseDto } from './contract-response.dto';

export class ContractPaginatedResponse {
  @ApiProperty({ type: [ContractResponseDto] })
  data: ContractResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
