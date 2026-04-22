import { ApiProperty, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { EnumBankDetailsType } from '../../../core/domain/entities/finance/bank-details.entity';
import { CardDetailsResponseDto } from './card-details-response.dto';
import { SbpDetailsResponseDto } from './sbp-details-response.dto';
import { PaymentDetailsResponseDto } from './payment-details-response.dto';

@ApiExtraModels(
  CardDetailsResponseDto,
  SbpDetailsResponseDto,
  PaymentDetailsResponseDto,
)
export class BankDetailsResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор',
    example: '49e46893-9a7e-409b-8c79-647aecaae555',
  })
  id: string;

  @ApiProperty({
    description: 'UUID бенефициара',
    example: '61f656e0-0a86-4ec2-bd43-232499f7ad66',
  })
  beneficiaryId: string;

  @ApiProperty({
    description: 'Тип реквизитов',
    enum: EnumBankDetailsType,
    example: EnumBankDetailsType.CARD,
  })
  type: EnumBankDetailsType;

  @ApiProperty({
    description: 'Детали реквизитов (зависят от типа)',
    oneOf: [
      { $ref: getSchemaPath(CardDetailsResponseDto) },
      { $ref: getSchemaPath(SbpDetailsResponseDto) },
      { $ref: getSchemaPath(PaymentDetailsResponseDto) },
    ],
    discriminator: {
      propertyName: 'type',
      mapping: {
        [EnumBankDetailsType.CARD]: getSchemaPath(CardDetailsResponseDto),
        [EnumBankDetailsType.SBP]: getSchemaPath(SbpDetailsResponseDto),
        [EnumBankDetailsType.PAYMENT_DETAILS]: getSchemaPath(
          PaymentDetailsResponseDto,
        ),
      },
    },
  })
  details:
    | CardDetailsResponseDto
    | SbpDetailsResponseDto
    | PaymentDetailsResponseDto;

  @ApiProperty({ description: 'Основные реквизиты', example: true })
  isDefault: boolean;

  @ApiProperty({
    description: 'Дата создания',
    example: '2025-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата обновления',
    example: '2025-01-01T00:00:00Z',
  })
  updatedAt: Date;
}
