import { BaseQueryDto } from '../shared/base-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class FindAllBidQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Цена отклика. Поиск больше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  public amountStart?: number;

  @ApiProperty({
    description: 'Цена отклика. Поиск меньше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  public amountEnd?: number;

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
    description: 'Уникальный идентификатор владельца отклика',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  public userId?: string;

  @ApiProperty({
    description: 'Уникальный идентификатор задачи',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  public taskId?: string;
}
