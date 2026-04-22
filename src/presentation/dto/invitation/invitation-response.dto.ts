import { ApiProperty } from '@nestjs/swagger';

export class InvitationResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор приглашения',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Заголовок письма',
    example: 'Какой то текст',
  })
  public title: string;

  @ApiProperty({
    description: 'Сопроводительное письмо',
    example: 'Какой то текст',
  })
  public coverLetter: string;

  @ApiProperty({
    description: 'Уникальный идентификатор отправителя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public senderId: string;

  @ApiProperty({
    description: 'Уникальный идентификатор получателя',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public recipientId: string;

  @ApiProperty({
    description: 'Уникальный идентификатор рабочего пространства',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  workspaceId: string | null;

  @ApiProperty({
    description: 'Уникальный идентификатор проекта',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
    required: false,
  })
  projectId: string | null;

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
