import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EnumBankDetailsType } from '../../../core/domain/entities/finance/bank-details.entity';
import { CardDetailsDto } from './card-details.dto';
import { SbpDetailsDto } from './sbp-details.dto';
import { PaymentDetailsDto } from './payment-details.dto';

export class CreateBankDetailsDto {
  @ApiProperty({
    description: 'UUID бенефициара, к которому добавляются реквизиты',
    example: '61f656e0-0a86-4ec2-bd43-232499f7ad66',
  })
  @IsUUID()
  @IsNotEmpty()
  beneficiaryId: string;

  @ApiProperty({
    description: 'Тип банковских реквизитов',
    enum: EnumBankDetailsType,
    example: EnumBankDetailsType.CARD,
  })
  @IsEnum(EnumBankDetailsType)
  @IsNotEmpty()
  type: EnumBankDetailsType;

  @ApiProperty({
    description: 'Флаг – являются ли реквизиты основными для бенефициара',
    default: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;

  @ApiProperty({
    description: 'Данные банковской карты (обязателен при type = CARD)',
    type: CardDetailsDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => CardDetailsDto)
  @IsOptional()
  card?: CardDetailsDto;

  @ApiProperty({
    description: 'Данные для оплаты через СБП (обязателен при type = SBP)',
    type: SbpDetailsDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => SbpDetailsDto)
  @IsOptional()
  sbp?: SbpDetailsDto;

  @ApiProperty({
    description:
      'Данные банковского счета (обязателен при type = PAYMENT_DETAILS)',
    type: PaymentDetailsDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => PaymentDetailsDto)
  @IsOptional()
  payment?: PaymentDetailsDto;
}
