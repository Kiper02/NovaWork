import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Username',
    example: 'user123',
  })
  public username: string;

  @ApiProperty({
    description: 'email',
    example: 'test@mail.ru',
  })
  public email: string;

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