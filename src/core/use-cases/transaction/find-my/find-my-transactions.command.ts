import { EnumTransactionStatus, EnumTransactionType } from '../../../domain/entities/finance/transaction.entity';

export interface IFindMyTransactionsCommand {
  userId: string;
  page: number;
  limit: number;
  startDate?: Date;
  endDate?: Date;
  type?: EnumTransactionType;
  status?: EnumTransactionStatus;
}
