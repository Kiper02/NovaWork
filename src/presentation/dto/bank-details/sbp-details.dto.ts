import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SbpDetailsDto {
  @ApiProperty({
    description: 'Номер телефона в формате +7XXXXXXXXXX',
    example: '+79161234567',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+7\d{10}$/, { message: 'Phone must be in format +7XXXXXXXXXX' })
  phoneNumber: string;

  @ApiProperty({
    description: 'Идентификатор банка в СБП (12 цифр)',
    example: '100000000004',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{12}$/, { message: 'BankId must be 12 digits' })
  bankId: string;
}
