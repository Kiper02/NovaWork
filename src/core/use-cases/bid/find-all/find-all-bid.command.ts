export interface IFindAllBidCommand {
  userId?: string,
  taskId?: string,
  amountStart?: number,
  amountEnd?: number,
  createdAtStart?: Date,
  createdAtEnd?: Date
  page: number;
  limit: number;
}