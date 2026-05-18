import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { EnumTransactionType } from '../../../core/domain/entities/finance/transaction.entity';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Заголовок транзакции',
    example: 'Пополнение счета',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Описание транзакции',
    required: false,
    example: 'Пополнение через банковскую карту',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Сумма транзакции',
    example: 1000.50,
  })
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({
    description: 'Тип транзакции',
    enum: EnumTransactionType,
    example: EnumTransactionType.DEPOSIT,
  })
  @IsEnum(EnumTransactionType)
  type: EnumTransactionType;
}
