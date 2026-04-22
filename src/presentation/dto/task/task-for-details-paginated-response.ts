import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { TaskResponseForDetailsDto } from './task-response-for-details.dto';

export class TaskForDetailsPaginatedResponse {
  @ApiProperty({ type: [TaskResponseForDetailsDto] })
  data: TaskResponseForDetailsDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
