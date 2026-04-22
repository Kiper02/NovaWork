export interface IInitDepositCommand {
  amount: number;
  userId: string;
  rebillId?: string;
}