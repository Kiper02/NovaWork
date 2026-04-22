import { BaseQueryDto } from '../shared/base-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsOptional,
} from 'class-validator';

export class FindAllProjectQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Дата создания. Поиск больше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsDate()
  @IsOptional()
  public createdAtStart?: Date;

  @ApiProperty({
    description: 'Дата создания. Поиск меньше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsDate()
  @IsOptional()
  public createdAtEnd?: Date;

  @ApiProperty({
    description: 'Уникальный идентификатор владельца проекта',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false
  })
  public userId?: string;
}
