import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { TaskResponseDto } from './task-response.dto';

export class TaskPaginatedResponse {
  @ApiProperty({ type: [TaskResponseDto] })
  data: TaskResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
