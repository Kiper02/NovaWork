import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { AccountResponseDto } from './account-response.dto';

export class AccountPaginatedResponse {
  @ApiProperty({ type: [AccountResponseDto] })
  data: AccountResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
