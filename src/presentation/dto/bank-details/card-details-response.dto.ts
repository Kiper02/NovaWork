import { ApiProperty } from '@nestjs/swagger';

export class CardDetailsResponseDto {
  @ApiProperty({
    description: 'Идентификатор карты в банке',
    example: '70000000707',
    required: false,
  })
  cardId?: string;

  @ApiProperty({
    description: 'Маскированный номер карты (для отображения)',
    example: '**** **** **** 3456',
  })
  maskedPan: string;

  @ApiProperty({
    description: 'Месяц окончания срока действия (1-12)',
    example: 12,
    required: false,
  })
  expiryMonth?: number;

  @ApiProperty({
    description: 'Год окончания срока действия (например, 2028)',
    example: 2028,
    required: false,
  })
  expiryYear?: number;

  @ApiProperty({
    description: 'Имя держателя карты',
    example: 'IVAN PETROV',
    required: false,
  })
  cardHolder?: string;
}
