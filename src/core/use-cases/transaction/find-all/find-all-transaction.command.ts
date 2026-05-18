import { EnumTransactionStatus, EnumTransactionType } from '../../../domain/entities/finance/transaction.entity';

export interface IFindAllTransactionCommand {
  userId?: string;
  page: number;
  limit: number;
  startDate?: Date;
  endDate?: Date;
  type?: EnumTransactionType;
  status?: EnumTransactionStatus;
}