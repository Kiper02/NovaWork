import { ApiProperty } from '@nestjs/swagger';

export class WorkspaceResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор рабочего пространства',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Название рабочего пространства',
    example: 'workspace123',
  })
  public name: string;

  @ApiProperty({
    description: 'Является ли workspace созданным по умолчанию',
    example: false
  })
  public isDefault: boolean

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
}
