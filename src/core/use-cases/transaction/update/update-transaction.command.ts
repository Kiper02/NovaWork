import { EnumTransactionStatus, EnumTransactionType } from '../../../domain/entities/finance/transaction.entity';

export interface IUpdateTransactionCommand {
  id: string;
  title?: string;
  description?: string;
  amount?: number;
  type?: EnumTransactionType;
  status?: EnumTransactionStatus;
}
