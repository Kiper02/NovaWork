import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор категории',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Название категории',
    example: 'Программирование',
  })
  public name: string;

  @ApiProperty({
    description: 'Описание категории',
    example: 'Всё, что связано с разработкой ПО',
    nullable: true,
  })
  public description: string | null;

  @ApiProperty({
    description: 'ID родительской категории (null – корневая)',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    nullable: true,
  })
  public parentId: string | null;

  @ApiProperty({
    description: 'Массив ID дочерних категорий',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    type: [String],
  })
  public childrenIds: string[];

  @ApiProperty({
    description: 'Список тэгов для поддержки получения релевантных категорий',
    example: ['Java', 'Node.js', 'TypeScript'],
    required: false,
  })
  public tags: string[];
}
