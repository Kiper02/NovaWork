import { ApiProperty } from '@nestjs/swagger';

export class ChatBlockDto {
  @ApiProperty({
    description: 'Дата блокировки',
    example: '2024-01-15T12:30:00.000Z'
  })
  public blockedAt: Date;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя заблокировавшего чат',
    example: '04331c2d-c1d2-4e35-8ed7-6c5171cff845'
  })
  public blockedByUserId: string;

  @ApiProperty({
    description: 'Причина блокировки',
    example: 'Заказчик отклонил отклик'
  })
  public reason: string;

  @ApiProperty({
    description: 'Дата до которой будет действовать блокировка',
    example: '2024-01-15T12:30:00.000Z'
  })
  public expiresAt?: Date
}