import { ApiProperty } from '@nestjs/swagger';

export class PaymentDetailsResponseDto {
  @ApiProperty({
    description: 'Маскированный номер счета (последние 4 цифры)',
    example: '****9900',
  })
  maskedAccount: string;

  @ApiProperty({
    description: 'Наименование банка получателя',
    example: 'АО "ТБанк"',
  })
  bankName: string;

  @ApiProperty({
    description: 'БИК банка получателя',
    example: '044525974',
    required: false,
  })
  bik?: string;
}
