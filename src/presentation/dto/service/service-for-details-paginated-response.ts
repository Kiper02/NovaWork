import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '../shared/pagination-meta.dto';
import { ServiceResponseForDetailsDto } from './service-response-for-details.dto';

export class ServiceForDetailsPaginatedResponse {
  @ApiProperty({ type: [ServiceResponseForDetailsDto] })
  data: ServiceResponseForDetailsDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
