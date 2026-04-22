import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { BeneficiaryResponseDto } from './beneficiary-response.dto';

export class BeneficiaryPaginatedResponse {
  @ApiProperty({ type: [BeneficiaryResponseDto] })
  data: BeneficiaryResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
