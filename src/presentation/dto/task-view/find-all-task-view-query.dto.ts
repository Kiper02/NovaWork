import { BaseQueryDto } from '../shared/base-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional } from 'class-validator';

export class FindAllTaskViewQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Уникальный идентификатор задачи',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  taskId?: string;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  userId?: string;
}
