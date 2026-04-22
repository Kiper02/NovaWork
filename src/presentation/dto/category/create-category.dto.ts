import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Название категории',
    example: 'Программирование',
    minLength: 2,
    maxLength: 50,
  })
  @Length(2, 50)
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({
    description: 'Описание категории',
    example: 'Всё, что связано с разработкой ПО',
    required: false,
    maxLength: 500,
  })
  @Length(0, 500)
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'ID родительской категории (для подкатегории)',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public parentId?: string;
}
