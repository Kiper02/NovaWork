import { EnumTaskStatus } from '../../../core/domain/entities/project/task.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from '../category/category-response.dto';
import { UserWithProfileResponseDto } from '../user/user-with-profile-response.dto';

export class TaskResponseForDetailsDto {
  @ApiProperty({
    description: 'Уникальный идентификатор задачи',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Владелец задачи',
    type: () => UserWithProfileResponseDto,
  })
  public user: UserWithProfileResponseDto;

  @ApiProperty({
    description: 'Заголовок задачи',
    example: 'Web Application development',
  })
  public title: string;

  @ApiProperty({
    description: 'Описание задачи',
    example: 'Some description',
  })
  public description: string;

  @ApiProperty({
    description: 'Минимальная цена',
    example: 1000,
  })
  public minPrice: number;

  @ApiProperty({
    description: 'Максимальная цена',
    example: 1000,
  })
  public maxPrice: number;

  @ApiProperty({
    description: 'Статус задачи',
    example: EnumTaskStatus.NOT_DISTRIBUTED,
  })
  public status: EnumTaskStatus;

  @ApiProperty({
    description: 'Опубликована ли задача',
    example: true,
  })
  public isPublished: boolean;

  @ApiProperty({
    description: 'ID рабочего пространства, к которому принадлежит задача',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public workspaceId: string;

  @ApiProperty({
    description: 'ID проекта, к которому будет принадлежит задача',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  public projectId: string | null;

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
    description: 'Массив категорий',
    type: () => [CategoryResponseDto],
  })
  public categories: CategoryResponseDto[] = [];

  @ApiProperty({
    description: 'Количество откликов на задачу',
    example: 5,
  })
  public bidsCount: number;

  @ApiProperty({
    description: 'Откликнулся ли я на задачу',
    example: true,
  })
  public iResponded: boolean;
}
