import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { EnumTransactionStatus, EnumTransactionType } from '../../../core/domain/entities/finance/transaction.entity';

export class UpdateTransactionDto {
  @ApiProperty({
    description: 'Заголовок транзакции',
    required: false,
    example: 'Обновленный заголовок',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Описание транзакции',
    required: false,
    example: 'Обновленное описание',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Сумма транзакции',
    required: false,
    example: 2000.00,
  })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  amount?: number;

  @ApiProperty({
    description: 'Тип транзакции',
    required: false,
    enum: EnumTransactionType,
    example: EnumTransactionType.WITHDRAWAL,
  })
  @IsOptional()
  @IsEnum(EnumTransactionType)
  type?: EnumTransactionType;

  @ApiProperty({
    description: 'Статус транзакции',
    required: false,
    enum: EnumTransactionStatus,
    example: EnumTransactionStatus.SUCCESS,
  })
  @IsOptional()
  @IsEnum(EnumTransactionStatus)
  status?: EnumTransactionStatus;
}
