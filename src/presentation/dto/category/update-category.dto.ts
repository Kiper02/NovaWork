import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Новое название категории',
    example: 'Бэкенд-разработка',
    required: false,
    minLength: 2,
    maxLength: 50,
  })
  @Length(2, 50)
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'Новое описание категории',
    example: 'Серверная часть, API, базы данных',
    required: false,
    maxLength: 500,
  })
  @Length(0, 500)
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Новый ID родительской категории (null — сделать корневой)',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public parentId?: string | null;

  @ApiProperty({
    description: 'Список тэгов для поддержки получения релевантных категорий',
    example: 'Java, Node.js, TypeScript',
    required: false,
  })
  @IsArray()
  @IsOptional()
  public tags?: string[]
}
