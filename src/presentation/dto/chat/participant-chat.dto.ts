import { ApiProperty } from '@nestjs/swagger';

export class ParticipantChatDto {
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
    description: 'URL аватара пользователя',
    example: 'http://example.com',
  })
  public avatar: string | null;
}