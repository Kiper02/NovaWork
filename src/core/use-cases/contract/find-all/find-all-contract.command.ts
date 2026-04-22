export interface IFindAllContractCommand {
  userId?: string;
  amountMin?: number;
  amountMax?: number;
  clientId?: string;
  contractorId?: string;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  taskId?: string;
  serviceId?: string;
  page: number;
  limit: number;
}