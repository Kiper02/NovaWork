import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EnumBeneficiaryAddressType } from '../../../core/domain/value-objects/beneficiary/beneficiary-address.type';

export class BeneficiaryAddressDto {
  @ApiProperty({
    enum: EnumBeneficiaryAddressType,
    example: EnumBeneficiaryAddressType.REGISTRATION_ADDRESS,
    description: 'Тип адреса',
  })
  @IsEnum(EnumBeneficiaryAddressType)
  @IsNotEmpty()
  type: EnumBeneficiaryAddressType;

  @ApiProperty({
    example: 'г. Москва, ул. Тверская, д. 1, кв. 5',
    description: 'Полный почтовый адрес',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
