import { ApiProperty } from '@nestjs/swagger';

export class ServiceResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор услуги',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Уникальный идентификатор владельца услуги',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public userId: string;

  @ApiProperty({
    description: 'Название услуги',
    example: 'Web Application development',
  })
  public title: string;

  @ApiProperty({
    description: 'Описание услуги',
    example: 'Some description',
  })
  public description: string;

  @ApiProperty({
    description: 'Цена услуги',
    example: 10000,
  })
  public price: number;

  @ApiProperty({
    description: 'Опубликована ли услуга',
    example: true,
  })
  public isPublished: boolean;

  @ApiProperty({
    description: 'ID рабочего пространства, к которому принадлежит услуга',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  public workspaceId: string | null;

  @ApiProperty({
    description: 'Дата создания',
    example: '2024-01-15T12:30:00.000Z',
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'Дата последнего обновления',
    example: '2024-01-15T12:30:00.000Z',
  })
  public updatedAt: Date;

  @ApiProperty({
    description: 'Массив идентификаторов категорий',
    example: ['04331c2d-c1d2-4e35-8ed7-6c5171cff845'],
  })
  public categoryIds: string[] = [];
}
