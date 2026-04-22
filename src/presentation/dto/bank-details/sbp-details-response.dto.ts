import { ApiProperty } from '@nestjs/swagger';

export class SbpDetailsResponseDto {
  @ApiProperty({
    description: 'Маскированный номер телефона (для отображения)',
    example: '+7***4567',
  })
  maskedPhone: string;

  @ApiProperty({
    description: 'Идентификатор банка в СБП',
    example: '100000000004',
    required: false,
  })
  bankId?: string;
}
