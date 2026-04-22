import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор сообщения',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Уникальный идентификатор отправителя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public senderId: string;

  @ApiProperty({
    description: 'Текст сообщения',
    example: 'Какой то текст',
    required: false
  })
  public text: string | null;

  @ApiProperty({
    description: 'Url файлов сообщения',
    example: 'http://example.com',
    required: false
  })
  public files: string[]

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
