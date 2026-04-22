import { BaseQueryDto } from '../shared/base-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDecimal,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class FindAllServiceQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public userId?: string;

  @ApiProperty({
    description: 'Название услуги. Поиск по совпадению',
    example: 'Web Application development',
    required: false,
  })
  @IsString()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Описание услуги. Поиск по совпадению',
    example: 'Some description',
    required: false,
  })
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Только (не)опубликованные услуги',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  public isPublished?: boolean;

  @ApiProperty({
    description: 'Минимальная цена. Поиск больше или равно указанного значения',
    example: 1000,
    required: false,
  })
  @IsDecimal()
  @IsOptional()
  public minPrice?: number;

  @ApiProperty({
    description:
      'Максимальная цена. Поиск меньше или равно указанного значения',
    example: 10000,
    required: false,
  })
  @IsDecimal()
  @IsOptional()
  public maxPrice?: number;

  @ApiProperty({
    description: 'Дата создания. Поиск больше или равно указанного значения',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  public createdAtStart?: Date;

  @ApiProperty({
    description: 'Дата создания. Поиск меньше или равно указанного значения',
    example: '2024-12-31T23:59:59.999Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  public createdAtEnd?: Date;

  @ApiProperty({
    description: 'Массив идентификаторов категорий',
    example: ['04331c2d-c1d2-4e35-8ed7-6c5171cff845'],
    required: false,
  })
  @IsUUID(4, { each: true })
  @IsArray()
  @IsOptional()
  public categoryIds?: string[] = [];
}
