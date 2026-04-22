import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { BankDetailsResponseDto } from './bank-details-response.dto';

export class BankDetailsPaginatedResponse {
  @ApiProperty({ type: [BankDetailsResponseDto] })
  data: BankDetailsResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
