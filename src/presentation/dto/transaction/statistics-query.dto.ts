import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { EnumTransactionType } from '../../../core/domain/entities/finance/transaction.entity';

export class StatisticsQueryDto {
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
    description: 'Тип транзакции (DEPOSIT - доходы, WITHDRAWAL - расходы)',
    required: false,
    enum: EnumTransactionType,
  })
  @IsOptional()
  @IsEnum(EnumTransactionType)
  type?: EnumTransactionType;

  @ApiProperty({
    description: 'Группировка для графика: day, week, month, year',
    required: false,
    default: 'month',
    enum: ['day', 'week', 'month', 'year'],
  })
  @IsOptional()
  @IsEnum(['day', 'week', 'month', 'year'])
  groupBy?: 'day' | 'week' | 'month' | 'year';
}
