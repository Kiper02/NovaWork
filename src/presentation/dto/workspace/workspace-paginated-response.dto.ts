import { ApiProperty } from '@nestjs/swagger';
import { WorkspaceResponseDto } from './workspace-response.dto';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';

export class WorkspacePaginatedResponseDto {
  @ApiProperty({ type: [WorkspaceResponseDto] })
  data: WorkspaceResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
