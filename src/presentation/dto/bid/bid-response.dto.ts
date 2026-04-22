import { ApiProperty } from '@nestjs/swagger';

export class BidResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор отклика',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public id: string;

  @ApiProperty({
    description: 'Уникальный идентификатор владельца отклика',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845',
  })
  public userId: string;

  @ApiProperty({
    description: 'Сопроводительное письмо',
    example: 'Какой то текст',
  })
  public coverLetter: string;

  @ApiProperty({
    description: 'Цена',
    example: 10000,
  })
  public amount: number;

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
