import { BaseQueryDto } from '../shared/base-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class FindMyBidQueryDto extends BaseQueryDto {
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
}
