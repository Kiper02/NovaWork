export interface ICreateContractCommand {
  amount: number;
  clientId: string;
  contractorId: string;
  taskId?: string;
  serviceId?: string;
}