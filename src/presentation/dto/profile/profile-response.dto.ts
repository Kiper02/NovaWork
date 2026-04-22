import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор аккаунта',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public userId: string;

  @ApiProperty({
    description: 'Имя',
    example: 'Иван',
  })
  public firstName: string;

  @ApiProperty({
    description: 'Отчество',
    example: 'Иванович',
  })
  public middleName: string;
  @ApiProperty({
    description: 'Фамилия',
    example: 'Иванов',
  })
  public lastName: string;

  @ApiProperty({
    description: 'URL аватара',
    example: 'https://example.com'
  })
  public avatar: string | null;

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
