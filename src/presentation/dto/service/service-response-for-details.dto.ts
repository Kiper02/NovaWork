import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDto } from '../category/category-response.dto';
import { UserResponseDto } from '../user/user-response.dto';
import { ProfileResponseDto } from '../profile/profile-response.dto';

export class ServiceResponseForDetailsDto {
  @ApiProperty({
    description: 'Уникальный идентификатор услуги',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Владелец услуги',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public user: UserResponseDto & {profile: ProfileResponseDto | null};

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
    description: 'Массив категорий',
    example: [CategoryResponseDto],
  })
  public categories: CategoryResponseDto[] = [];
}
