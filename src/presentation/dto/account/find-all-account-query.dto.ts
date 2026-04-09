import { BaseQueryDto } from '../shared/base-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class FindAllAccountQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  userId?: string;
}