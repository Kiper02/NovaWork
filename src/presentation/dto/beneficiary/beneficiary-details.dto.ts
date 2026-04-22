import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BeneficiaryDocumentDto } from './beneficiary-document.dto';
import { BeneficiaryAddressDto } from './beneficiary-address.dto';

export class BeneficiaryDetailsDto {
  @ApiProperty({ example: 'Иван' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Иванович', required: false })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty({ example: 'Иванов' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  isSelfEmployed: boolean;

  @ApiProperty({ example: '1990-01-01' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'birthDate must be in YYYY-MM-DD format',
  })
  birthDate: string;

  @ApiProperty({ example: 'г. Москва' })
  @IsString()
  @IsNotEmpty()
  birthPlace: string;

  @ApiProperty({ example: 'RUS' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 3)
  citizenship: string;

  @ApiProperty({
    example: '+79161234567',
    description: 'Номер телефона в формате E.164 (например, +79161234567)',
  })
  @Matches(/^\+7\d{10}$/, {
    message: 'phoneNumber must be in format +7XXXXXXXXXX (11 digits total)',
  })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ example: 'ivan@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: [BeneficiaryDocumentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BeneficiaryDocumentDto)
  @IsNotEmpty()
  documents: BeneficiaryDocumentDto[];

  @ApiProperty({ type: [BeneficiaryAddressDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BeneficiaryAddressDto)
  @IsNotEmpty()
  addresses: BeneficiaryAddressDto[];

  @ApiProperty({ example: '1234567890', required: false })
  @IsString()
  @IsOptional()
  @Length(10, 12)
  inn?: string;

  @ApiProperty({
    example: '12345678901',
    description: 'СНИЛС (11 цифр без разделителей)',
  })
  @IsOptional()
  @Matches(/^\d{11}$/, { message: 'snils must contain exactly 11 digits' })
  snils?: string;
}
