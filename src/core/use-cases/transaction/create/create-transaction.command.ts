import { EnumTransactionType } from '../../../domain/entities/finance/transaction.entity';

export interface ICreateTransactionCommand {
  accountId: string;
  title: string;
  description?: string;
  amount: number;
  type: EnumTransactionType;
}
