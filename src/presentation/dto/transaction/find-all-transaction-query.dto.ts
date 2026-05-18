import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { BaseQueryDto } from '../shared/base-query.dto';
import {
  EnumTransactionStatus,
  EnumTransactionType,
} from '../../../core/domain/entities/finance/transaction.entity';

export class FindAllTransactionQueryDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Дата начала периода (ISO 8601)',
    required: false,
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'Дата окончания периода (ISO 8601)',
    required: false,
    example: '2024-12-31T23:59:59.999Z',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    description: 'Тип транзакции',
    required: false,
    enum: EnumTransactionType,
  })
  @IsOptional()
  @IsEnum(EnumTransactionType)
  type?: EnumTransactionType;

  @ApiProperty({
    description: 'Статус транзакции',
    required: false,
    enum: EnumTransactionStatus,
  })
  @IsOptional()
  @IsEnum(EnumTransactionStatus)
  status?: EnumTransactionStatus;
}
