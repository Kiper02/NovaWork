import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { ProfileResponseDto } from './profile-response.dto';

export class ProfilePaginatedResponse {
  @ApiProperty({ type: [ProfileResponseDto] })
  data: ProfileResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
