import { ApiProperty } from '@nestjs/swagger';
import { MessageSenderDto } from './message-sender.dto';

export class LastMessageDto {
  @ApiProperty({
    description: 'Уникальный идентификатор сообщения',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Отправитель',
    example: MessageSenderDto,
  })
  public sender: MessageSenderDto;

  @ApiProperty({
    description: 'Текст сообщения',
    example: 'Какой то текст',
  })
  public text: string | null;

  @ApiProperty({
    description: 'Url файлов сообщения',
    example: 'http://example.com',
  })
  public files: string[];

  @ApiProperty({
    description: 'Дата создания',
    example: '2024-01-15T12:30:00.000Z',
  })
  public createdAt: Date;
}
