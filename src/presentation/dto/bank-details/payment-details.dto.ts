import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class PaymentDetailsDto {
  @ApiProperty({
    description: 'БИК банка получателя (9 цифр)',
    example: '044525974',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{9}$/, { message: 'BIK must be 9 digits' })
  bik: string;

  @ApiProperty({
    description: 'Наименование банка получателя',
    example: 'АО "ТБанк"',
  })
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @ApiProperty({
    description: 'Номер расчетного счета получателя (20 или 22 цифры)',
    example: '11223344556677889900',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{20}$|^\d{22}$/, {
    message: 'Account number must be 20 or 22 digits',
  })
  accountNumber: string;

  @ApiProperty({
    description: 'Корреспондентский счет банка получателя (20 цифр)',
    example: '30101810145250000974',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{20}$/, { message: 'Correspondent account must be 20 digits' })
  corrAccountNumber: string;

  @ApiProperty({
    description: 'ИНН получателя (10 или 12 цифр)',
    example: '906858195320',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Length(10, 12)
  inn?: string;

  @ApiProperty({
    description: 'КПП получателя (9 цифр)',
    example: '773401001',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Matches(/^\d{9}$/, { message: 'KPP must be 9 digits' })
  kpp?: string;

  @ApiProperty({
    description: 'Наименование получателя (для юрлиц или ИП)',
    example: 'Киняев Фома Семенович',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;
}
