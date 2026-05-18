import { ApiProperty } from '@nestjs/swagger';

export class TaskViewResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор просмотра задачи',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public userId: string;

  @ApiProperty({
    description: 'Уникальный идентификатор задачи',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public taskId: string;

  @ApiProperty({
    description: 'Дата просмотра',
    example: '2024-01-15T12:30:00.000Z',
  })
  public viewedAt: Date;

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
