import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { ChatResponseDto } from './chat-response.dto';

export class ChatPaginatedResponse {
  @ApiProperty({ type: [ChatResponseDto] })
  data: ChatResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
