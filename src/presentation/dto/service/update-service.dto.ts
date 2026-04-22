import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateServiceDto {
  @ApiProperty({
    description: 'Название услуги',
    example: 'Тестовая услуга',
    required: false,
  })
  @Length(1, 50)
  @IsString()
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'Описание услуги',
    example: 'Тестовое описание услуги',
    required: false,
  })
  @Length(10, 1000)
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Цена услуги',
    example: 10000,
    required: false,
  })
  @Max(100000)
  @Min(100)
  @IsNumber()
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'Опубликовать ли услугу',
    example: true,
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  public isPublished?: boolean;

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
