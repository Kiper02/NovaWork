import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { FindMyChatsResponseDto } from './find-my-chats-response.dto';

export class MyChatPaginatedResponse {
  @ApiProperty({ type: [FindMyChatsResponseDto] })
  data: FindMyChatsResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
