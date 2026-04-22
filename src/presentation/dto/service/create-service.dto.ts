import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString, IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Название услуги',
    example: 'Тестовая услуга',
  })
  @Length(1, 50)
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'Описание услуги',
    example: 'Тестовое описание услуги',
  })
  @Length(10, 1000)
  @IsString()
  @IsNotEmpty()
  public description: string;

  @ApiProperty({
    description: 'Цена услуги',
    example: 10000,
  })
  @Max(100000)
  @Min(100)
  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @ApiProperty({
    description: 'Опубликовать ли задачу. По умолчанию true',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  public isPublished: boolean = true;

  @ApiProperty({
    description:
      'Идентификатор рабочего пространства к которой привязать услугу. Если не указан, будет использоваться пространство по умолчанию',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  public workspaceId?: string;

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