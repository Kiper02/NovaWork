import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseQueryDto } from '../shared/base-query.dto';

export class FindAllCategoryQueryDto extends BaseQueryDto {
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
}
