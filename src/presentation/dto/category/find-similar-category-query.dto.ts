import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseQueryDto } from '../shared/base-query.dto';
import { Transform } from 'class-transformer';

export class FindSimilarCategoryQueryDto extends BaseQueryDto {
  @ApiProperty({
    description:
      'Поиск категории по названию (частичное совпадение, регистронезависимо)',
    example: 'Программирование',
    required: false,
  })
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'Фильтр по родительской категории (null – только корневые)',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  public parentId?: string;

  @ApiProperty({
    description: 'Список тэгов для поддержки получения релевантных категорий',
    example: 'Java, Node.js, TypeScript',
    required: false,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  public tags?: string[];

  @ApiProperty({
    description: 'Список исключающих тэгов',
    example: ['04331c2d-c1d2-4e35-8ed7-6c5171cff845'],
    required: false,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  public excludeIds?: string[];
}
