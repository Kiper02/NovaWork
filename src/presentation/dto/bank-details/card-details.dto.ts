import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CardDetailsDto {
  @ApiProperty({
    description: 'Номер карты (16 цифр)',
    example: '1234567890123456',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{16}$/, { message: 'PAN must be 16 digits' })
  pan: string;

  @ApiProperty({
    description: 'Срок действия карты в формате MMYY',
    example: '1228',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}$/, { message: 'Expiry date must be in MMYY format' })
  expiryDate: string;

  @ApiProperty({
    description: 'Имя держателя карты (как на карте)',
    example: 'IVAN PETROV',
    required: false,
  })
  @IsString()
  @IsOptional()
  cardHolder?: string;

  @ApiProperty({
    description: 'CVV/CVC код (3 или 4 цифры)',
    example: '111',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Matches(/^\d{3,4}$/, { message: 'CVV must be 3 or 4 digits' })
  cvv?: string;
}
