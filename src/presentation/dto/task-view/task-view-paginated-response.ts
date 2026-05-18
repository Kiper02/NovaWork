import { ApiProperty } from '@nestjs/swagger';
import { TaskViewResponseDto } from './task-view-response.dto';

export class TaskViewPaginatedResponse {
  @ApiProperty({ type: [TaskViewResponseDto] })
  data: TaskViewResponseDto[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;
}
