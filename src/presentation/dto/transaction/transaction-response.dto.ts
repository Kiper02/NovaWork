import { ApiProperty } from '@nestjs/swagger';
import { EnumTransactionStatus, EnumTransactionType } from '../../../core/domain/entities/finance/transaction.entity';

export class TransactionResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор транзакции',
    example: '49e46893-9a7e-409b-8c79-647aecaae555',
  })
  id: string;

  @ApiProperty({
    description: 'Заголовок транзакции',
    example: 'Пополнение счета',
  })
  title: string;

  @ApiProperty({
    description: 'Описание транзакции',
    required: false,
    example: 'Пополнение через банковскую карту',
  })
  description: string;

  @ApiProperty({
    description: 'Сумма транзакции',
    example: 1000.50,
  })
  amount: number;

  @ApiProperty({
    description: 'Тип транзакции',
    enum: EnumTransactionType,
    example: EnumTransactionType.DEPOSIT,
  })
  type: EnumTransactionType;

  @ApiProperty({
    description: 'Статус транзакции',
    enum: EnumTransactionStatus,
    example: EnumTransactionStatus.SUCCESS,
  })
  status: EnumTransactionStatus;

  @ApiProperty({
    description: 'ID аккаунта',
    example: '61f656e0-0a86-4ec2-bd43-232499f7ad66',
  })
  accountId: string;

  @ApiProperty({
    description: 'Дата создания',
    example: '2025-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Дата обновления',
    example: '2025-01-01T00:00:00Z',
  })
  updatedAt: Date;
}
