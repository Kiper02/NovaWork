export interface IUpdateAccountCommand {
  userId: string;
  availableBalance?: number,
  frozenBalance?: number
}